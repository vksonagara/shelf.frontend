export default function Button({ children, disabled, ...props }) {
  return (
    <>
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-5 w-full ${
          disabled && "disabled:opacity-70 disabled:cursor-not-allowed"
        }`}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    </>
  );
}
