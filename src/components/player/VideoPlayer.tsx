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
      <div className="h-[360px] md:h-[480px] lg:h-[540px] bg-gray-800 flex items-center justify-center rounded-lg text-gray-300 text-lg font-medium select-none">
        Stream unavailable
      </div>
    );
  }

  const embedUrl = `https://megaplay.buzz/stream/s-2/${stream.episodeId}/${stream.language}`;

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4">
      {/* Video Player Container with 16:9 Aspect Ratio */}
      <div
        className="relative rounded-lg overflow-hidden bg-transparent"
        style={{ aspectRatio: '21 / 9' }}
      >
        <iframe
          key={stream.episodeId}
          src={embedUrl}
          allowFullScreen
          frameBorder={0}
          className="w-full h-full"
          title={`Episode ${stream.episodeId} - ${stream.language.toUpperCase()}`}
          loading="lazy"
        />
      </div>
    </div>
  );
}
