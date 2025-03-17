import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>
      <Nav />
      <div className="w-4/5 mx-auto content-box">
        <div className="h-96">home</div>
      </div>
      <Footer />
    </div>
  );
}
