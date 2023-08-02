import { useState } from "react";
import { NextPage, GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { Product } from "../types/types";
import { ProductForm } from "../components/ProductForm";

// Declare the ProductDetailProps type
interface ProductDetailProps {
  initialProduct: Product;
}

const ProductDetail: NextPage<ProductDetailProps> = ({ initialProduct }) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product>(initialProduct);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleUpdateProduct = () => {
    // Perform validation for price, type, description, and color
    if (product.price < 0 || product.type.length > 55 || product.description.length > 55 || product.color.length > 55) {
      // Show an error message or prevent the form submission
      return;
    }

    // Perform the update action (you may want to implement a backend API to handle the update)
    console.log("Product updated:", product);

    // Redirect back to the Product List Page
    router.push("/product-list");
  };

  return (
    <div>
      <h1>Product Detail Page</h1>
      <ProductForm product={product} onInputChange={handleInputChange} onUpdateProduct={handleUpdateProduct} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for all product SKUs
  const response = await fetch("/data/products.json");
  const products: Product[] = await response.json();

  const paths = products.map((product) => ({
    params: { sku: product.sku },
  }));

  return { paths, fallback: false };
};

// export const getStaticProps: GetStaticProps<ProductDetailProps, { sku: string }> = async (
//     context: GetStaticPropsContext<{ sku: string }>
//   ) => {
//     const response = await fetch("/data/products.json");
//     const products: Product[] = await response.json();
//     const sku = context.params?.sku as string;
//     const initialProduct = products.find((product) => product.sku === sku);
  
//     return {
//       props: { initialProduct },
//     };
//   };
  

export default ProductDetail;
