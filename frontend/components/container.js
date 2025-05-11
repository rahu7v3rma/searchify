import { Heading1 } from "./heading";

export default function MainbarContainer({ title, children }) {
  return (
    <div>
      <div className="border-b border-primary-border pb-4">
        <Heading1 text={title} />
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
