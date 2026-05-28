export function Loader({ label = "Loading" }: { label?: string }) {
  return <div role="status" aria-live="polite">{label}...</div>;
}
