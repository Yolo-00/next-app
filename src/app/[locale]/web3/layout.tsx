import Nav from "@/components/nav";
import { Web3Sidebar } from "./_components/sidebar";

export default function Web3Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <div className="mx-auto w-4/5 flex h-screen-minus-nav border-x border-border">
        <Web3Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </>
  );
}

