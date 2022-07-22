import Head from "next/head";
import { Hero, FeaturedList } from "components/home";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedList />
    </>
  );
}
