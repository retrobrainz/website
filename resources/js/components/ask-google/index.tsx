export default function AskGoogle({ query = '' }: { query: string }) {
  return (
    <a
      href={`https://www.google.com/search?udm=50&source=searchlabs&q=${encodeURIComponent(query)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Ask Google
    </a>
  );
}
