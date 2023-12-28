import classNames from "classnames";
import { MouseEventHandler } from "react";
export default function Button({
  children,
  disabled,
  onClick,
  type,
  id,
  className,
}: {
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  children: React.ReactNode;
  id?: string;
  onClick?: MouseEventHandler;
  className?: string;
}) {
  return (
    <button
      type={type}
      id={id}
      disabled={disabled}
      className={classNames(
        className,
        "text-purple border border-black-50 px-6 py-2 w-fit text-sm group relative bg-white"
      )}
      onClick={onClick}
    >
      <div className="border border-black-50 absolute top-0 left-0 w-full h-full group-hover:-translate-x-2 group-hover:translate-y-1 -z-10 duration-300"/>
      {children}
    </button>
  );
}
