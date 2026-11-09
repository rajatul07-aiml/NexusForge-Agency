import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");

    const expectedSecret = process.env.REVALIDATION_SECRET;

    if (!secret || secret !== expectedSecret) {
      return NextResponse.json(
        { message: "Invalid or missing revalidation secret token" },
        { status: 401 }
      );
    }

    const path = searchParams.get("path");

    if (path) {
      revalidatePath(path);
    } else {
      revalidatePath("/");
      revalidatePath("/work");
      revalidatePath("/blog");
    }

    return NextResponse.json({
      revalidated: true,
      path: path || ["/", "/work", "/blog"],
      timestamp: Date.now(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error revalidating", error: err?.message || String(err) },
      { status: 500 }
    );
  }
}

