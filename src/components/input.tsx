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
  <div className="mt-5">
    <div className="relative">
      <input
        multiple={multiple}
        type={type}
        value={value}
        name={name}
        className={`border-b border-black-50 w-full focus:outline-none pt-3 pb-1 px-1 peer`}
        onChange={onChange}
      />
      {label && (
        <label
          className={`absolute -top-3 text-sm left-3 bg-white peer-focus:translate-x-1 peer-focus:-translate-y-1 peer-focus:scale-90 peer-focus:opacity-75 duration-300 ${
            invalid && "text-red peer-focus:opacity-100"
          }`}
        >
          {label}
        </label>
      )}
      {message && (
        <p className="text-red text-xs mt-0.5 ml-0.5">{message.message}</p>
      )}
    </div>
  </div>
);

export default Input;
