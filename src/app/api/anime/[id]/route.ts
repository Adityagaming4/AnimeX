import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ Await params

  try {
    const response = await fetch(`http://localhost:3000/api/anime/${id}`);
    const data = await response.json();

    // Fetch trailer ID from Kitsu API
    const kitsuResponse = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(data.title)}`);
    const kitsuData = await kitsuResponse.json();
    console.log("Kitsu API Response:", kitsuData); // Log Kitsu response

    let trailerId = null;
    if (kitsuData.data && kitsuData.data.length > 0) {
      trailerId = kitsuData.data[0].attributes.youtubeVideoId;
    }
    console.log("Extracted Trailer ID:", trailerId); // Log extracted trailer ID

    return NextResponse.json({ ...data, trailerId });
  } catch (error) {
    console.error("Error fetching anime details or trailer:", error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}