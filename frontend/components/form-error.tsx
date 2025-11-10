export function FormError({
  error,
  size = "sm",
}: {
  error?: string[];
  size?: string;
}) {
  if (!error) return null;

  return error.map((err) => (
    <div key={err} className={`text-${size} text-red-600`}>
      {err}
    </div>
  ));
}
