"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabValue = searchParams.get("tab") || "account";

  const handleTab = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs defaultValue={tabValue} className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account" onClick={() => handleTab("account")}>
          Account
        </TabsTrigger>
        <TabsTrigger value="password" onClick={() => handleTab("password")}>
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default TabsPage;
