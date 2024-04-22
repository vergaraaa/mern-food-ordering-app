import React from "react";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
};

const Layout = ({ children, showHero = false }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {showHero ? <Hero /> : <></>}

      <div className="container mx-auto flex-1 py-1">{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
