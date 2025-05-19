export function Button({ children, onClick, type = "button", disabled = false, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
