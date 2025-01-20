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

      <div className="grid grid-cols-2 gap-4 w-[500px]">
        <div className="bg-blue-500 aspect-square flex items-center justify-center text-white">
          1
        </div>
        <div className="bg-blue-500 aspect-square flex items-center justify-center text-white">
          2
        </div>
        <div className="bg-blue-500 aspect-square flex items-center justify-center text-white">
          3
        </div>
        <div className="bg-blue-500 aspect-square flex items-center justify-center text-white">
          4
        </div>
      </div>
    </div>
  );
};
export default Page;
