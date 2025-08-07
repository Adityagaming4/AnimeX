
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LiveSearchBox } from "./LiveSearchBox";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AnimeX</span>
        </Link>
        <div className="relative hidden md:block">
          <LiveSearchBox />
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
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
        </nav>
        <Button variant="outline" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </div>
    </header>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
