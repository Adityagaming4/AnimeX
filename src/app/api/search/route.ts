
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  const page = searchParams.get('page');

  try {
    const response = await fetch(`http://localhost:3000/api/search?keyword=${keyword}&page=${page}`);
    const data = await response.json();
    console.log('API Search Data:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching search data:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
