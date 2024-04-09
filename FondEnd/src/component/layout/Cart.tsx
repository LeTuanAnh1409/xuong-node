import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useLocalStorage from '../../hook/useStorage';
import Banner from './Banner';
import Footer from './Footer';
import Header from './Header';
import Service from './Service';

const CartPage = () => {
    const [user] = useLocalStorage('user', {});
    const userId = user?.user?._id;

    const [selectedProducts, setSelectedProducts] = useState({});
    const [selectedTotalPrice, setSelectedTotalPrice] = useState(0);

    const handleCheckboxChange = (productId, price) => {
        const newSelectedProducts = {
            ...selectedProducts,
            [productId]: !selectedProducts[productId]
        };
        setSelectedProducts(newSelectedProducts);
    };

    useEffect(() => {
        let totalPrice = 0;
        Object.keys(selectedProducts).forEach(productId => {
            if (selectedProducts[productId]) {
                const product = data.products.find(product => product.productId === productId);
                if (product) {
                    totalPrice += product.price * product.quantity;
                }
            }
        });
        setSelectedTotalPrice(totalPrice);
    }, [selectedProducts]);

    if (!userId) {
        return (
            <div>
                <Header />
                <Banner />
                <section className="cart">
                    <div className="container">
                        <div className="cart-product">
                            <p>Vui lòng đăng nhập</p>
                        </div>
                    </div>
                </section>
                <Service />
                <Footer />
            </div>
        );
    }

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['cart', userId],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/cart/${userId}`);
            return data;
        },
    });
    

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:3000/cart/${userId}/${productId}`);
            refetch();
        } catch (error) {
            console.error(error);
        }
    };

    const increaseQuantity = async (productId) => {
        try {
            await axios.put(`http://localhost:3000/cart/${userId}/increase/${productId}`);
            refetch();
        } catch (error) {
            console.error(error);
        }
    };

    const decreaseQuantity = async (productId) => {
        try {
            await axios.put(`http://localhost:3000/cart/${userId}/decrease/${productId}`);
            refetch();
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (isError || !data || !data.products.length) {
        return (
            <div>
                <Header />
                <Banner />
                <section className="cart">
                    <div className="container">
                        <div className="cart-product">
                            <p>Giỏ hàng trống !</p>
                            <Link to="/product" className="cart-product-btn">Mua Hàng</Link>
                        </div>
                    </div>
                </section>
                <Service />
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <Banner />
            <section className="cart">
                <div className="container">
                    <div className="cart-product">
                        <div className="cart-product-left">
                            <div className="cart-product-table">
                                <table className="cart-product-table-form">
                                    <thead className="cart-product-table-head">
                                        <tr>
                                            <th></th>
                                            <th><strong>Product</strong></th>
                                            <th><strong>Price</strong></th>
                                            <th><strong>Quantity</strong></th>
                                            <th><strong>Subtotal</strong></th>
                                            <th></th>
                                            <th><strong>Select</strong></th>
                                        </tr>
                                    </thead>
                                    <tbody className="cart-product-table-body">
                                        {data?.products.map((product: any, index: number) => (
                                            <tr key={index}>
                                                <td><img className="cart-product-table-imgpro" src={product.image} alt={product.name} /></td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>
                                                    <button className="btn btn-primary" onClick={() => decreaseQuantity(product.productId)}>-</button>
                                                    <input className="cart-product-tabl-input" type="text" value={product.quantity} readOnly />
                                                    <button className="btn btn-primary" onClick={() => increaseQuantity(product.productId)}>+</button>
                                                </td>
                                                <td>{product.quantity * product.price}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => removeFromCart(product.productId)}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedProducts[product.productId]}
                                                        onChange={() => handleCheckboxChange(product.productId, product.price)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="cart-product-right">
                            <h3>Cart Totals</h3>
                            <div className="cart-product-price">
                                <div className="cart-product-price__left">
                                    <p><strong>Subtotal</strong></p>
                                    <p><strong>Total</strong></p>
                                </div>
                                <div className="cart-product-price__right">
                                    <p>{selectedTotalPrice}</p>
                                    <span>{data.total}</span>
                                </div>
                            </div>
                            <Link to={{ pathname: '/orders', state: { selectedProducts, selectedTotalPrice } }} className="cart-product-btn">Check Out</Link>
                        </div>
                    </div>
                </div>
            </section>
            <Service />
            <Footer />
        </div>
    );
};

export default CartPage;
