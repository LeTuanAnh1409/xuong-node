import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { IProduct } from '../interfaces/product';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const { data: productData, isLoading, isError } = useQuery<IProduct>(['product', id], async () => {
    const { data } = await axios.get(`http://localhost:3000/products/${id}`);
    return data;
  })

  useEffect(() => {
    if (productData) {
      reset(productData);
    }
  }, [productData, reset]);

  const { mutate } = useMutation((product: IProduct) => axios.put(`http://localhost:3000/products/${_id}`, product), {
    onSuccess: () => {
      alert("Cập nhật sản phẩm thành công");
      queryClient.invalidateQueries(["PRODUCTS"]);
      navigate(`/admin/products`);
    }
  });

  const onSubmit = (data: IProduct) => {
    mutate(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-semibold mb-6 text-center">CẬP NHẬT SẢN PHẨM</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700 text-sm font-medium mb-2">Tên Sản Phẩm</label>
            <input type="text" id="productName" {...register("name")} defaultValue={productData.name} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.name && 'border-red-500'}`} />
            {errors.name && <p className="text-red-500 text-sm mt-1">Tên sản phẩm phải có ít nhất 3 ký tự</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="productImage" className="block text-gray-700 text-sm font-medium mb-2">Ảnh Sản Phẩm</label>
            <input type="text" id="productImage" {...register("image")} defaultValue={productData.image} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.image && 'border-red-500'}`} />
            {errors.image && <p className="text-red-500 text-sm mt-1">Đường dẫn ảnh sản phẩm phải có ít nhất 3 ký tự</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="productPrice" className="block text-gray-700 text-sm font-medium mb-2">Giá Sản Phẩm</label>
            <input type="number" id="productPrice" {...register("price")} defaultValue={productData.price} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.price && 'border-red-500'}`} />
            {errors.price && <p className="text-red-500 text-sm mt-1">Giá sản phẩm phải là số dương</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="productDesc" className="block text-gray-700 text-sm font-medium mb-2">Mô Tả Sản Phẩm</label>
            <textarea id="productDesc" {...register("description")} defaultValue={productData.description} className={`w-full h-24 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.description && 'border-red-500'}`} rows="5"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Cập Nhật</button>
        </form>
      </div>
    </div>
  );
}

export default ProductEdit;
