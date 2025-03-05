import Nav from "@/components/nav";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <div className="content-box">{children}</div>
    </>
  );
}
