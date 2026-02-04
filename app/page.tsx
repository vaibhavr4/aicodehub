import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          AI-Powered Coding Interview Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Practice coding problems with AI assistance. Get real-time feedback,
          hints, and guidance as you solve algorithmic challenges.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link href="/problems">
            <Button size="lg">Browse Problems</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
