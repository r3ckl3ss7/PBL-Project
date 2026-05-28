import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-12 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">About DriveGuard AI</h1>
          <p className="text-muted-foreground">
            DriveGuard AI is an in-browser driver safety monitor that runs locally on your device.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">What it does</h2>
          <p className="text-muted-foreground">
            It detects drowsiness, yawning, and distraction using your camera feed and provides
            real-time visual and audio alerts.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Privacy</h2>
          <p className="text-muted-foreground">
            All processing happens in your browser. No video frames are uploaded.
          </p>
        </section>

        <div>
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
