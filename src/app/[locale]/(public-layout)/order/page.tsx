import { Suspense } from "react";

import TabsPage from "./TabsPage";
const Page = () => {
  return (
    <Suspense>
      <TabsPage />
    </Suspense>
  );
};

export default Page;
