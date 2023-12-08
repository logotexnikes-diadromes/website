import { InputHTMLAttributes, forwardRef, ComponentProps } from "react";
import cn from "classnames";

type TInput = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  wrapperClasses?: ComponentProps<"div">["className"];
};

const Textarea = forwardRef<HTMLInputElement, TInput>(
  ({ wrapperClasses, label, className, id, name, value, ...rest }, ref) => {
    return (
      <div className={wrapperClasses + " mb-2"}>
        {label && (
          <label htmlFor={id} className="pl-1 inline-block font-semibold">
            {label}
          </label>
        )}
        <textarea
        rows={6}
          className={cn(
            "border-b px-5 focus:outline-none w-full text-black ",
            className
          )}
        />
      </div>
    );
  }
);
export default Textarea;
