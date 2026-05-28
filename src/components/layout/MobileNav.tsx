import Link from "next/link";

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-neutral-200 bg-white p-2 text-center text-sm md:hidden">
      <Link href="/">Home</Link>
      <Link href="/assignments">Assignments</Link>
      <Link href="/assignments/create">Create</Link>
    </nav>
  );
}
