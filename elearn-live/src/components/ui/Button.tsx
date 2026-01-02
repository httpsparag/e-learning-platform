import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded-xl text-sm font-medium transition";

  const variants = {
    primary: "bg-[rgb(var(--primary))] text-white hover:bg-[rgb(var(--primary-dark))]",
    secondary: "border border-[rgb(var(--border))] bg-[rgb(var(--card))]",
    ghost: "hover:bg-[rgb(var(--card))]",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}
