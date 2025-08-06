
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
      <Link href="/" className="hover:text-primary" prefetch={false}>
        Home
      </Link>
      <Link href="/search" className="hover:text-primary" prefetch={false}>
        Search
      </Link>
    </nav>
  );
}
