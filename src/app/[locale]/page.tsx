import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>
      <Nav />
      <div className="p-5 content-height">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="mb-5 bg-slate-200">
            {i}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
