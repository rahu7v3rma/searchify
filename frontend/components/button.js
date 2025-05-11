export function TextButton({ text, onClick }) {
  return (
    <button
      className="bg-primary-button-background px-4 py-2 rounded-md hover:opacity-50 transition-opacity cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
