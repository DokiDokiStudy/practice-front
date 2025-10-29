type SelectOption = {
  id: number;
  name: string;
};

type CategorySelectProps = {
  value: number;
  onChange: (value: number) => void;
  options: SelectOption[];
  placeholder?: string;
  isLoading?: boolean;
  className?: string;
};

export const CategorySelect = ({
  value,
  onChange,
  options,
  placeholder = "카테고리 선택",
  isLoading = false,
  className = "",
}: CategorySelectProps) => {
  if (isLoading) {
    return (
      <select disabled className={`w-full border rounded px-3 py-2 ${className}`}>
        <option>로딩 중...</option>
      </select>
    );
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={`w-full border rounded px-3 py-2 ${className}`}
    >
      <option value={0}>{placeholder}</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
