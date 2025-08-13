import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    // Fetch anime details from your backend
    const response = await fetch(`https://hi-anime-production.up.railway.app/api/anime/${id}`);
    const data = await response.json();

    // Directly return data without Kitsu lookup
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching anime details:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
