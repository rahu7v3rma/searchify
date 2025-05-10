export function Heading1({ text }: { text: string }) {
  return <h1 className="text-3xl font-bold">{text}</h1>;
}

export function Heading2({ text }: { text: string }) {
  return <h2 className="text-xl font-bold">{text}</h2>;
}

export function Heading3({ text }: { text: string }) {
  return <h3 className="text-lg font-bold">{text}</h3>;
}

export function Heading4({ text }: { text: string }) {
  return <h4 className="text-base font-bold">{text}</h4>;
}
