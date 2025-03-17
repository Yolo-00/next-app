import Nav from "@/components/nav";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <div className="content-box w-4/5 mx-auto">{children}</div>
    </>
  );
}
