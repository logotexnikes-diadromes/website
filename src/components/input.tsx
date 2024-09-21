import { FieldError } from "react-hook-form";

const Input = ({
  value,
  label,
  name,
  invalid,
  type,
  multiple,
  onChange,
  message,
}: {
  multiple?: boolean;
  value?: string;
  label: string;
  name?: string;
  invalid?: boolean;
  type?: string;
  onChange?: any;
  message?: FieldError | undefined;
}) => (
  <div>
    {label && (
      <label className={`text-sm ml-3 translate-y-3 ${invalid && "text-red"}`}>
        {label}
      </label>
    )}
    <input
      multiple={multiple}
      type={type}
      value={value}
      name={name}
      className={`border border-black/10 bg-neutral-50 rounded-xl w-full outline-none py-2 px-3`}
      onChange={onChange}
    />
    {message && (
      <p className="text-red text-xs mt-0.5 ml-0.5">{message.message}</p>
    )}
  </div>
);

export default Input;
