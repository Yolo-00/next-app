"use client";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { useState } from "react";
const Page = () => {
  const t = useTranslations("myPage");
  const [value, setValue] = useState("");
  return (
    <div>
      <h1>{t("title")}</h1>
      {value}
      <Input
        placeholder="请输入"
        className="w-50"
        defaultValue={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
export default Page;
