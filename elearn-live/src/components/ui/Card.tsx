export function Card({ children }: any) {
  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
      {children}
    </div>
  );
}
