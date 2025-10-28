import { useTheme } from "@/shared/theme";

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
  const { classes } = useTheme();

  return (
    <label className="block mb-6">
      <span className={`${classes.label}`} style={classes.labelStyle}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`mt-2 block w-full rounded-2xl px-5 py-3 transition shadow-sm ${classes.inputBorder} ${classes.inputFocus}`}
        style={{
          ...classes.inputBackgroundStyle,
          ...classes.inputBorderStyle,
          ...classes.inputTextStyle,
          ...classes.inputPlaceholderStyle,
        }}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
};
