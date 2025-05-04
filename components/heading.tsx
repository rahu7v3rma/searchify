export function Heading1({ text }: { text: string }) {
  return <h1 className="text-3xl font-bold">{text}</h1>;
}

export function Heading2({ text }: { text: string }) {
  return <h2 className="text-xl font-bold">{text}</h2>;
}
