'use client';

interface VideoPlayerProps {
  stream: {
    status: boolean;
    episodeId: string;
    language: 'sub' | 'dub';
  };
}

export function VideoPlayer({ stream }: VideoPlayerProps) {
  if (!stream?.status) {
    return (
      <div className="h-[600px] bg-secondary flex items-center justify-center rounded-lg">
        Stream unavailable
      </div>
    );
  }

  const embedUrl = `https://megaplay.buzz/stream/s-2/${stream.episodeId}/${stream.language}`;

  return (
    <div className="w-full">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
        <iframe
          key={stream.episodeId}
          src={embedUrl}
          allowFullScreen
          referrerPolicy="no-referrer"
          className="w-full h-full border-0 overflow-hidden"
          title={`Episode ${stream.episodeId}`}
        />
      </div>
      <div className="mt-4 p-4 bg-secondary rounded-lg">
        <h2 className="text-xl font-semibold">Now Playing</h2>
        <p className="text-muted-foreground">
          Episode {stream.episodeId} ({stream.language})
        </p>
        <p className="text-xs text-yellow-600 mt-2">
          ⚠️ For best results, close DevTools (F12) and use a real domain (deployed site).
        </p>
      </div>
    </div>
  );
}
