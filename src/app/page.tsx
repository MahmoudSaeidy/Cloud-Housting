import Image from "next/image";
import Header from '../components/header/Header'
import { Hero } from "../components/Home/Hero";
import { WebHostingPlan } from "../components/Home/WebHostingPlan";

export default function Home() {
  return (
    <section className="fix-height">
      <Hero />
      <h2 className="text-3xl text-center mt-10 font-bold ">Choose Your Web Hosting Plan</h2>
      <div className="container m-auto flex justify-center items-center my-7 flex-wrap md:gap-7">
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </section>
  );
}
