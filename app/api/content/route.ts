import { NextRequest, NextResponse } from "next/server";
import { getPublishedContent, getContentItemBySlug } from "@/lib/cms";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const type = searchParams.get("type");

    if (slug) {
      const item = await getContentItemBySlug(slug);
      if (!item) {
        return NextResponse.json({ error: "Content not found" }, { status: 404 });
      }
      return NextResponse.json(item);
    }

    const items = await getPublishedContent(type as any || undefined);
    return NextResponse.json(items, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch content from Supabase" },
      { status: 500 }
    );
  }
}
