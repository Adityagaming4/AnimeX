
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  const page = searchParams.get('page');

  console.log("Search API hit! Keyword:", keyword, "Page:", page); // Added log

  // Return a dummy response to test if the route is being hit
  return NextResponse.json({ message: `Search received for: ${keyword}` });
}
