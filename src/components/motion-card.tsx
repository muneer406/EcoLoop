"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

export function MotionCard({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98, transition: { duration: 0.075 } }}
      className={className}
      {...props}
    />
  );
}
