interface FormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

export const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: FormInputProps) => {
  return (
    <label className="block mb-6">
      <span className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mt-2 block w-full rounded-lg px-4 py-2.5 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
};
