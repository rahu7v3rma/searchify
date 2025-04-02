import Footer from "@/components/footer";
import Header from "@/components/header";

const Home = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <div className="absolute bottom-0 w-full bg-[#a5d2e8]">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
