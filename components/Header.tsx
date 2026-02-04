import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">AI Interview Platform</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/problems">
            <Button variant="ghost">Problems</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
