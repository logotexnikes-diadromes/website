import classNames from "classnames";

export function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={classNames(className, "[font-size:_clamp(40px,6vw,60px)] text-red")}>
      {children}
    </h1>
  );
}
export function H2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={classNames(className, "[font-size:_clamp(30px,5vw,40px)]")}>
      {children}
    </h2>
  );
}
export function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={classNames(className, "[font-size:_clamp(25px,4vw,30px)]")}>
      {children}
    </h3>
  );
}
export function H3Small({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4 className={classNames(className, "[font-size:_clamp(19px,3vw,25px)]")}>
      {children}
    </h4>
  );
}
export function Detail({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={classNames(
        className,
        "[font-size:_clamp(20px,3vw,30px)] opacity-50"
      )}
    >
      {children}
    </h1>
  );
}
