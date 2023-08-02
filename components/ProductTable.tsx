import React from "react";
import { Product } from "../types/types";
import {
  Table,
  Button,
  ButtonGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface ProductTableProps {
  products: Product[];
  onDeleteProduct: (sku: string) => void;
  onFilterByColor: (color: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onDeleteProduct,
  onFilterByColor,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const colors = Array.from(new Set(products.map((product) => product.color)));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Color</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.sku}>
                <td>{product.name}</td>
                <td>{product.color}</td>
                <td>{product.type}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      variant="danger"
                      onClick={() => onDeleteProduct(product.sku)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => onFilterByColor(product.color)}
                    >
                      Filter by Color
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row className="justify-content-between align-items-center mb-3">
          <Col>
            <Button
              variant="secondary"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </Button>
          </Col>
          <Col>
            <p className="text-center">
              Page {currentPage} of {totalPages}
            </p>
          </Col>
          <Col className="text-end">
            <Button
              variant="secondary"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Filter by Color:</h3>
            <ButtonGroup>
              {colors.map((color) => (
                <Button
                  key={color}
                  variant="outline-primary"
                  onClick={() => onFilterByColor(color)}
                >
                  {color}
                </Button>
              ))}
              <Button
                variant="outline-secondary"
                onClick={() => onFilterByColor("")}
              >
                Clear Filter
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
