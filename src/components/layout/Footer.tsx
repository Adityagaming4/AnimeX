
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8 px-4 md:px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AnimeX</span>
          </Link>
          <p className="text-muted-foreground">
            Your one-stop destination for all things anime. Stream your favorites, discover new titles, and join the
            community.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Navigation</h4>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              Home
            </Link>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              Trending
            </Link>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              Top Airing
            </Link>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              Most Popular
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Legal</h4>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              DMCA
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold">Social</h4>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              Twitter
            </Link>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              Instagram
            </Link>
            <Link href="#" className="hover:text-primary" prefetch={false}>
              Discord
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold">Disclaimer</h4>
          <p className="text-muted-foreground">
            AnimeX does not store any files on our server, we only link to the media which is hosted on 3rd party
            services.
          </p>
        </div>
      </div>
    </footer>
  );
}
