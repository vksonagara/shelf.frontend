export default function Input({ errorMessage, ...props }) {
  return (
    <>
      <input
        {...props}
        className={`w-full mt-6 p-3 border border-gray-300 rounded-md ${
          errorMessage ? "border-red-600" : ""
        }`}
      />
      {errorMessage && (
        <div className="w-full">
          <p className="m-0 p-0 text-red-500 text-xs">{errorMessage}</p>
        </div>
      )}
    </>
  );
}
