import { useState } from "react";
import { GetStaticProps, NextPage } from "next";
import { Product } from "../types/types";
import { ProductTable } from "../components/ProductTable";
import ProductsData from "../data/products.json";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface ProductListProps {
  initialProducts: Product[];
}

const PAGE_SIZE = 10;

const ProductList: NextPage<ProductListProps> = ({ initialProducts }) => {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(productList.length / PAGE_SIZE);

  const handleDeleteProduct = (sku: string) => {
    setProductList((prevProducts) =>
      prevProducts.filter((product) => product.sku !== sku)
    );
  };

  const handleFilterByColor = (color: string) => {
    setProductList(
      initialProducts.filter((product) => product.color === color)
    );
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedProducts = productList.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Product List Page</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ProductTable
            products={paginatedProducts}
            onDeleteProduct={handleDeleteProduct}
            onFilterByColor={handleFilterByColor}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export const getStaticProps: GetStaticProps<ProductListProps> = async () => {
  const initialProducts: Product[] = ProductsData;

  return {
    props: { initialProducts },
  };
};

export default ProductList;
