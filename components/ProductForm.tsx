import { Product } from "../types/types";

interface ProductFormProps {
  product: Product;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateProduct: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onInputChange, onUpdateProduct }) => {
  return (
    <div>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={product.name} onChange={onInputChange} />
        </div>
        <div>
          <label>Type:</label>
          <input type="text" name="type" value={product.type} onChange={onInputChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={product.description} onChange={onInputChange} />
        </div>
        <div>
          <label>Color:</label>
          <input type="text" name="color" value={product.color} onChange={onInputChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={onInputChange} />
        </div>
        <button type="button" onClick={onUpdateProduct}>
          Update
        </button>
      </form>
    </div>
  );
};
