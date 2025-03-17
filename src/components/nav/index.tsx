import Image from "next/image";
import { Link } from "@/i18n/routing";

import NavMenu from "./menu";
import NavRight from "./right";

const Nav = () => {
  return (
    <div className="sticky top-0 z-50 bg-background text-foreground h-nav-height border-b border-dotted border-gray-200">
      <div className="w-4/5 h-full mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={40}
              height={40}
              priority
            />
          </Link>

          <NavMenu />
        </div>

        <NavRight />
      </div>
    </div>
  );
};

export default Nav;
