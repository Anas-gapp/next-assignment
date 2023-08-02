import { NextPage } from "next";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Welcome to our eCommerce Store!</h1>
      <Link href="/product-list">View Products</Link>
    </div>
  );
};

export default Home;
