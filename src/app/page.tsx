import Footer from "@/components/footer";
import Header from "@/components/header";
import Home from "@/components/home";

const HomePage = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <Home />
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
