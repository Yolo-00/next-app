import { useTranslations } from "next-intl";
const Page = () => {
  const t = useTranslations("myPage");
  return (
    <div>
      <h1>{t("title")}</h1>
    </div>
  );
};
export default Page;
