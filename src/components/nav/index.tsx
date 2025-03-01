import Image from "next/image";
import { Link } from "@/i18n/routing";

import NavMenu from "./menu";
import NavRight from "./right";

const Nav = () => {
  return (
    <>
      <div className="flex justify-between items-center bg-background text-foreground sticky top-0 h-nav-height px-5 border-b border-gray-200">
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
    </>
  );
};

export default Nav;
