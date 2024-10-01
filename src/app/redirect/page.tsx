import { Suspense } from "react";
import ActualPage from "./suspense";

export default function Page() {
  return (
    <Suspense>
      <ActualPage />
    </Suspense>
  );
}
