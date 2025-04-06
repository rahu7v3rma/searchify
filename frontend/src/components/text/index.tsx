import { memo } from "react";

const Text = memo(({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <span className={`text-sm ${className}`}>{children}</span>;
});

export default Text;
