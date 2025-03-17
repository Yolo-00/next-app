import { Github, Twitter } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export default function Footer() {
  const t = useTranslations();

  return (
    <div className="w-4/5 mx-auto min-h-20 bg-background text-foreground flex items-start">
      <div className="w-60">
        <div className="text-2xl font-bold mb-5">NEXT APP</div>
        <Link className="underline" href="mailto:g20180630105@gmail.com">
          g20180630105@gmail.com
        </Link>
        <div className="font-semibold my-5">{t("layout.footer.follow")}</div>
        <div className="flex gap-5">
          <Link href="https://github.com/Yolo-00/next-app">
            <Button
              variant="ghost"
              className="w-8 h-8 [&_svg]:size-5 bg-accent"
            >
              <Github strokeWidth={2} />
            </Button>
          </Link>

          <Link href="https://x.com/Yolo__00">
            <Button
              variant="ghost"
              className="w-8 h-8 [&_svg]:size-5 bg-accent"
            >
              <Twitter strokeWidth={2} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
