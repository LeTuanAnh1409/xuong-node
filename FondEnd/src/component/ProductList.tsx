import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IProduct } from '../interfaces/product';

const ProductList = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['PRODUCTS'],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/products");
      return data;
    },
  });

  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const handleDeleteProduct = async (productId: string) => {
    try {
      window.confirm("ban có muốn xóa không")
      setDeletingProductId(productId);
      await axios.delete(`http://localhost:3000/products/${productId}`);
      await refetch();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeletingProductId(null);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>

      <Link className="btn btn-danger" to="/admin/products/add">Thêm</Link>
      {isError && <div>Có lỗi xảy ra khi tải dữ liệu</div>}
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Tên Sản Phẩm</th>
            <th scope="col">Giá</th>
            <th scope="col">Mô Tả</th>
            <th scope="col">Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product: IProduct) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>
                <img src={product.image} alt={product.name} width={50} height={50} />
              </td>
              <td>
                <h4>{product.name}</h4>
              </td>
              <td>
                <span>{product.price}</span>
              </td>
              <td>
                <p>{product.description}</p>
              </td>
              <td>
                <div className="d-flex">
                  <button className="btn btn-danger" onClick={() => handleDeleteProduct(product._id)} disabled={deletingProductId === product._id}>Xóa</button>
                  <Link to={`/admin/products/${product._id}/edit`} className="btn btn-primary ml-3">Sửa</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
