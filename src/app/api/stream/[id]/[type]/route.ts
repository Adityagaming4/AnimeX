import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string; type: 'sub' | 'dub' } }
) {
  const { id, type } = params;
  console.log(`[API Route] Fetching stream for episode ID: ${id} with type: ${type}`);

  try {
    const streamResponse = await fetch(`https://hi-anime-production.up.railway.app/api/stream/${id}/${type}`);
    if (!streamResponse.ok) {
      throw new Error(`Failed to fetch stream: ${streamResponse.statusText}`);
    }
    const data = await streamResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Route] Error fetching stream data:', error);
    return NextResponse.json({ error: 'Failed to fetch stream' }, { status: 500 });
  }
}
