import { Noto_Sans } from "next/font/google";

const font = Noto_Sans({
  weight: ["400"],
  subsets: ["greek", "latin"],
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={font.className}>{children}</div>;
}
