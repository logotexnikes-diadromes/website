//@ts-nocheck
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="[font-size:_clamp(40px,6vw,60px)] text-red py-24">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="[font-size:_clamp(30px,5vw,40px)]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="[font-size:_clamp(25px,4vw,30px)]">{children}</h3>
    ),
    p: ({ children }) => (
      <h4 className="[font-size:_clamp(20px,2vw,15px)] mb-4 font-sans">{children}</h4>
    ),
    h6: ({ children }) => (
      <p className="[font-size:_clamp(20px,4vw,25px)] opacity-50 mb-2">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link href={href!} className="underline" target="_blank">
        {children}
      </Link>
    ),
    img: (props) => (
      <Image
        width={999}
        height={999}
        style={{ margin: " 20px 0 20px 0" }}
        className="md:max-h-[80vh] max-w-3xl max-md:w-full border border-black-50"
        {...props}
      />
    ),
    ...components,
  };
}