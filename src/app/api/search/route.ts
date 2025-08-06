import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  const page = searchParams.get('page') || '1';

  console.log("Search API hit! Keyword:", keyword, "Page:", page);

  if (!keyword) {
    return NextResponse.json({ response: [], pageInfo: { totalPages: 0, currentPage: 1, hasNextPage: false } });
  }

  try {
    // Proxy request to your HiAnime API backend
    const backendResponse = await fetch(`http://localhost:3000/api/search?keyword=${encodeURIComponent(keyword)}&page=${page}`);

    if (!backendResponse.ok) {
      throw new Error(`Backend search API error: ${backendResponse.status}`);
    }

    const data = await backendResponse.json();

    // Return data as-is or transform if needed
    // Make sure the data structure fits your frontend expectations
    return NextResponse.json(data);

  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ response: [], error: 'Search failed' }, { status: 500 });
  }
}
