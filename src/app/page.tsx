export default function Home() {
  return (
    <main className="mx-auto max-w-screen-lg p-6 space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Placeholder</h1>
        <p className="text-muted-foreground">
          Minimal page showcasing your theme tokens (toggle light/dark in the top right).
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border p-4">
          <p className="font-medium text-foreground">Primary</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="inline-block h-8 w-8 rounded bg-primary" />
            <span className="rounded bg-primary px-3 py-1 text-primary-foreground">Primary badge</span>
            <span className="text-primary">Primary text</span>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <p className="font-medium text-foreground">Surface</p>
          <div className="mt-2 rounded border bg-card p-3 text-card-foreground">
            Card surface with foreground text
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <p className="font-medium text-foreground">Ring / Focus</p>
          <button className="rounded border px-3 py-1 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Focus me
          </button>
        </div>

        <div className="rounded-lg border p-4">
          <p className="font-medium text-foreground">Accent</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="inline-block h-8 w-8 rounded bg-accent" />
            <span className="rounded bg-accent px-3 py-1 text-accent-foreground">Accent badge</span>
          </div>
        </div>
      </section>
    </main>
  );
}
