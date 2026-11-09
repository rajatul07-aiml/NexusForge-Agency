import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/cms";
import { createClient } from "@supabase/supabase-js";

// Global in-memory delta cache for real-time views across reloads
const localDeltas = new Map<string, number>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug = body?.slug;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Missing or invalid slug" }, { status: 400 });
    }

    // 1. Try Supabase RPC first if defined in the database
    const { data: rpcCount, error: rpcError } = await supabase.rpc("increment_view_count", {
      item_slug: slug,
    });

    if (!rpcError && typeof rpcCount === "number") {
      return NextResponse.json({ views_count: rpcCount, method: "rpc" });
    }

    // 2. If SUPABASE_SERVICE_ROLE_KEY is present, update directly via privileged client
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (serviceKey) {
      const adminSupabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ogvozhhldxfljnupppdv.supabase.co",
        serviceKey
      );

      const { data: current } = await adminSupabase
        .from("content_items")
        .select("views_count")
        .eq("slug", slug)
        .maybeSingle();

      const newCount = (current?.views_count || 0) + 1;
      await adminSupabase
        .from("content_items")
        .update({ views_count: newCount })
        .eq("slug", slug);

      return NextResponse.json({ views_count: newCount, method: "service_role" });
    }

    // 3. Fallback: Query current count from Supabase and track live increment delta
    const { data: item } = await supabase
      .from("content_items")
      .select("views_count")
      .eq("slug", slug)
      .maybeSingle();

    const baseCount = item?.views_count || 0;
    const currentDelta = (localDeltas.get(slug) || 0) + 1;
    localDeltas.set(slug, currentDelta);

    return NextResponse.json({
      views_count: baseCount + currentDelta,
      method: "live_tracking",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to increment view counter" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const { data: item } = await supabase
    .from("content_items")
    .select("views_count")
    .eq("slug", slug)
    .maybeSingle();

  const baseCount = item?.views_count || 0;
  const delta = localDeltas.get(slug) || 0;

  return NextResponse.json({ views_count: baseCount + delta });
}

