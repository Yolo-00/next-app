import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar/index";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-screen-minus-nav">
          <ScrollArea className="h-full">{children}</ScrollArea>
        </main>
      </SidebarProvider>
    </div>
  );
}
