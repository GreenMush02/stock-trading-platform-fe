export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js, TypeScript, and Tailwind CSS. © 2024 Stock Trading Platform.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
