import Nav from "@/components/nav";
import Footer from "@/components/footer";
import UsdtBalanceCard from "@/components/home/UsdtBalanceCard";

export default function Home() {
  return (
    <div>
      <Nav />
      <div className="w-4/5 mx-auto content-box">
        <div className="py-10 space-y-6">
          <h1 className="text-3xl font-bold">Home</h1>
          <UsdtBalanceCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}
