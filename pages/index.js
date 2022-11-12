import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";
import Escrow from "../components/Escrow";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Escrow</title>
        <meta name="description" content="Crud contracat" />
      </Head>
      <Header />
      <Escrow />
      <Footer />
    </div>
  );
}
