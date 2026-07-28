import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";

interface ButtonProps extends HTMLMotionProps<"a"> {
  variant?: Variant;
  children: ReactNode;
  icon?: ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-400",
    ghost: "text-zinc-400 hover:text-white hover:bg-zinc-800",
    outline:
      "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white hover:bg-zinc-800/50",
  };

  return (
    <motion.a
      {...props}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
      {icon && <span>{icon}</span>}
    </motion.a>
  );
}