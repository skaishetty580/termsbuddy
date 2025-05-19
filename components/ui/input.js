export function Input({ value, onChange, placeholder, type = "text", className = "", ...props }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border px-3 py-2 rounded w-full ${className}`}
      {...props}
    />
  );
}
