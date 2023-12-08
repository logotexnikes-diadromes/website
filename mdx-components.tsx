import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="[font-size:_clamp(40px,6vw,60px)]">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="[font-size:_clamp(30px,5vw,40px)]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="[font-size:_clamp(25px,4vw,30px)]">{children}</h3>
    ),
    p: ({ children }) => (
      <h4 className="[font-size:_clamp(20px,2vw,25px)]">{children}</h4>
    ),
    h6: ({ children }) => (
      <p className="[font-size:_clamp(20px,3vw,30px)] opacity-50">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href!}
        className="underline"
        target="_blank"
      >
        {children}
      </Link>
    ),
    ...components,
  };
}
