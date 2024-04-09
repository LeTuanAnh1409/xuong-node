import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useCart from '../../hook/usecart';
import useLocalStorage from '../../hook/useStorage';
import Header from './Header';
import Banner from './Banner';
import Service from './Service';
import Footer from './Footer';

const OrderPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [user] = useLocalStorage('user', {});
    const userId = user?.user?._id;
    const { data, calculateTotal } = useCart();
    const { mutate: placeOrder, isLoading, isError } = useMutation(
        async (order) => {
            const response = await axios.post('http://localhost:3000/orders', order);
            return response.data;
        }
    );

    const onSubmit = async (formData) => {
        try {
            await placeOrder({
                userId,
                items: data?.products,
                totalPrice: calculateTotal(),
                customerInfo: formData,
            });
        } catch (error) {
            console.error(error);
            // Handle error here, e.g., set error state
        }
    };

    return (
      <div>
        <Header/>
        <Banner/>
          <div className="container mx-auto">
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div>
                            <label htmlFor="name" className="block">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Tên"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="text-red-500">Vui lòng nhập tên của bạn</span>}
                        </div>
                        <div>
                            <label htmlFor="phone" className="block">Số điện thoại</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Số điện thoại"
                                {...register("phone", {
                                    required: true,
                                    pattern: /^[0-9\b]+$/,
                                    minLength: 10,
                                    maxLength: 10
                                })}
                            />
                            {errors.phone?.type === 'required' && <span className="text-red-500">Vui lòng nhập số điện thoại của bạn</span>}
                            {errors.phone?.type === 'pattern' && <span className="text-red-500">Số điện thoại không hợp lệ</span>}
                            {errors.phone?.type === 'minLength' && <span className="text-red-500">Số điện thoại phải có ít nhất 10 chữ số</span>}
                            {errors.phone?.type === 'maxLength' && <span className="text-red-500">Số điện thoại tối đa 10 chữ số</span>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email của bạn"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500">Vui lòng nhập email của bạn</span>}
                        </div>
                        <div>
                            <label htmlFor="address" className="block">Địa chỉ</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Địa chỉ của bạn"
                                {...register("address", { required: true })}
                            />
                            {errors.address && <span className="text-red-500">Vui lòng nhập địa chỉ của bạn</span>}
                        </div>
                        {/* Display cart items */}
                        <h2>Thông tin sản phẩm:</h2>
                        <ul>
                            {data?.products?.map((product) => (
                                <li key={product._id}>
                                    <p>{product.name}</p>
                                    <p>Giá: {product.price}</p>
                                    <p>Số lượng: {product.quantity}</p>
                                </li>
                            ))}
                        </ul>
                        <button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {isLoading ? 'Đang xử lý...' : 'Hoàn thành đơn hàng'}
                        </button>
                    </form>
                    {isError && <div className="text-red-500">Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.</div>}
                </div>
                <div className="col-span-4">
                    <h2>Thông tin đơn hàng:</h2>
                    <p>Tổng số sản phẩm: {data?.products ? data.products.length : 0}</p>
                    <p>Tổng tiền: {calculateTotal()}</p>
                </div>
            </div>
        </div>
        <Service/>
        <Footer/>
      </div>
    );
};

export default OrderPage;
