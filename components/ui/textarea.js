export function Textarea({ value, onChange, placeholder, className = "", ...props }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border px-3 py-2 rounded w-full ${className}`}
      {...props}
    />
  );
}
