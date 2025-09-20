
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://hi-anime.onrender.com/api/home');
    const data = await response.json();
    console.log('API Home Data:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching home data:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
