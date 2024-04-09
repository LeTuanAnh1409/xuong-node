import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { IProduct } from '../interfaces/product';

const ProductAdd = () => {
  const productSchema = Joi.object({
    name: Joi.string().required().min(3),
    price: Joi.number().positive().required(),
    image: Joi.string().required().min(3),
    description: Joi.string(),
  });

  const navigate = useNavigate();
const   queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      image: "",
      description: "",
    },
  });

  const {mutate} = useMutation({
    mutationFn: async(product:IProduct)=>{
const {data} = await axios.post(`http://localhost:3000/products`, product);
return data.product;

    },
    onSuccess:()=>{
      alert("them san pham thanh cong");
      queryClient.invadidateQueries({
        queryKey:["PRODUCTS"],
      });
    }
  })

  const onSubmit = (product: IProduct) => {
    mutate(product);
    navigate(`/admin`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-semibold mb-6 text-center">THÊM SẢN PHẨM</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700 text-sm font-medium mb-2">Tên Sản Phẩm</label>
            <input type="text" id="productName" {...register("name")} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.name && 'border-red-500'}`} />
            {errors.name && <p className="text-red-500 text-sm mt-1">Tên sản phẩm phải có ít nhất 3 ký tự</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="productImage" className="block text-gray-700 text-sm font-medium mb-2">Ảnh Sản Phẩm</label>
            <input type="text" id="productImage" {...register("image")} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.image && 'border-red-500'}`} />
            {errors.image && <p className="text-red-500 text-sm mt-1">Đường dẫn ảnh sản phẩm phải có ít nhất 3 ký tự</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="productPrice" className="block text-gray-700 text-sm font-medium mb-2">Giá Sản Phẩm</label>
            <input type="number" id="productPrice" {...register("price")} className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.price && 'border-red-500'}`} />
            {errors.price && <p className="text-red-500 text-sm mt-1">Giá sản phẩm phải là số dương</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="productDesc" className="block text-gray-700 text-sm font-medium mb-2">Mô Tả Sản Phẩm</label>
            <textarea id="productDesc" {...register("description")} className={`w-full h-24 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 ${errors.description && 'border-red-500'}`} rows="5"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Thêm</button>
        </form>
      </div>
    </div>
  );
}

export default ProductAdd;
