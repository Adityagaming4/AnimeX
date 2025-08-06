'use client'

interface VideoPlayerProps {
  stream: {
    status: boolean
    episodeId: string
    language: string
    embedUrl: string
    iframe: string
  }
}

export function VideoPlayer({ stream }: VideoPlayerProps) {
  if (!stream?.status) {
    return (
      <div className="h-[600px] bg-secondary flex items-center justify-center rounded-lg">
        Stream unavailable
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
        {/* Option 1: Use the entire iframe HTML from your API (safest) */}
        <div
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: stream.iframe }}
        />

        {/* Option 2: Construct the iframe yourself (equivalent) */}
        {/* <iframe
          src={stream.embedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          referrerPolicy="no-referrer"
          className="w-full h-full"
          title={`Episode ${stream.episodeId}`}
        /> */}
      </div>
      <div className="mt-4 p-4 bg-secondary rounded-lg">
        <h2 className="text-xl font-semibold">Now Playing</h2>
        <p className="text-muted-foreground">Episode {stream.episodeId} ({stream.language})</p>
        <p className="text-xs text-yellow-600 mt-2">
          ⚠️ For best results, close DevTools (F12) and use a real domain (deployed site).
        </p>
      </div>
    </div>
  );
}