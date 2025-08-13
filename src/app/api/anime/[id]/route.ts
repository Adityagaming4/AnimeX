import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

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
