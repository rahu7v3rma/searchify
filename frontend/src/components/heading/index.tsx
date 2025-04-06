import { memo } from "react";

const Heading = memo(({ children }: { children: React.ReactNode }) => {
  return <span className="text-2xl font-bold">{children}</span>;
});

export default Heading;
