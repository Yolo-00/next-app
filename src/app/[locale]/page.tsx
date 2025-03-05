import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div>
      <Nav />
      <div className="p-5 content-box">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="mb-5">
            {i}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
