import { createClient } from "@supabase/supabase-js";

export interface PublishedContent {
  id: string;
  title: string;
  slug: string;
  type: "blog" | "portfolio" | "case_study" | "landing_copy";
  summary: string | null;
  content?: string | null;
  author_name: string;
  views_count: number;
  published_at: string | null;
  updated_at: string;
  cover_image?: string | null;
  tags?: string[] | null;
}

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ogvozhhldxfljnupppdv.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_6KBj_GrCeytVS6V8HyJ-JA_UwNKiCZR";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetches all published content items from Supabase `content_items` table.
 * Filterable by content type ('blog', 'portfolio', 'case_study', 'landing_copy') or an array of types.
 */
export async function getPublishedContent(
  type?: PublishedContent["type"] | PublishedContent["type"][]
): Promise<PublishedContent[]> {
  try {
    let query = supabase
      .from("content_items")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (type) {
      if (Array.isArray(type)) {
        query = query.in("type", type);
      } else {
        query = query.eq("type", type);
      }
    }

    const { data, error } = await query;

    if (error) {
      return [];
    }

    return (data as PublishedContent[]) || [];
  } catch {
    return [];
  }
}

/**
 * Fetches a single published content item by slug.
 */
export async function getContentItemBySlug(
  slug: string
): Promise<PublishedContent | null> {
  try {
    const { data, error } = await supabase
      .from("content_items")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      return null;
    }

    return (data as PublishedContent) || null;
  } catch {
    return null;
  }
}

/**
 * Real-time view counter: registers a view for a given content item slug
 * and returns the updated count.
 */
export async function incrementViewCount(slug: string): Promise<number | null> {
  try {
    if (typeof window !== "undefined") {
      const sessionKey = `viewed_${slug}`;
      if (sessionStorage.getItem(sessionKey)) {
        return null;
      }
      sessionStorage.setItem(sessionKey, "1");
    }

    const res = await fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });

    if (res.ok) {
      const data = await res.json();
      return typeof data.views_count === "number" ? data.views_count : null;
    }
    return null;
  } catch {
    return null;
  }
}

