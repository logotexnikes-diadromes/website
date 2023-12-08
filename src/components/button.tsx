import classNames from "classnames";
import { MouseEventHandler } from "react";
export default function Button({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: MouseEventHandler;
  className?: string;
}) {
  return (
    <button
      className={classNames(
        className,
        "px-5 py-1 my-1 border border-black-50 duration-300 hover:tracking-wide"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
