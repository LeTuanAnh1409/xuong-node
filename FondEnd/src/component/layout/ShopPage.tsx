import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Header from './Header';
import Banner from './Banner';
import { IProduct } from '../../interfaces/product';
import { Link } from 'react-router-dom';
import Service from './Service';
import Footer from './Footer';
import useLocalStorage from '../../hook/useStorage';

type ProductListProps = {
    featured?: boolean;
    data?: IProduct[];
};

const ShopPage = ({ featured, data }: ProductListProps) => {
    const [showNotification, setShowNotification] = useState(false); 
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const [showLoginNotification, setShowLoginNotification] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const { data: productsData, isLoading: productsIsLoading, isError: productsIsError } = useQuery({
        queryKey: ['PRODUCTS'],
        queryFn: async () => {
            const { data } = await axios.get("http://localhost:3000/products");
            return data;
        },
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productsData?.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const { mutate: addToCartMutation } = useMutation({
        mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
            try {
                await axios.post(`http://localhost:3000/cart/addtocart`, {
                    userId,
                    productId,
                    quantity,
                });
                setShowNotification(true);

                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
            } catch (error) {
                throw new Error("Failed to add product to cart");
            }
        }
    });

    const handleAddToCart = (productId: string) => {
        if (!userId) {
            setShowLoginNotification(true);
        } else {
            addToCartMutation({ productId, quantity: 1 });
        }
    };

    if (productsIsLoading) return <div>Loading...</div>;
    if (productsIsError) return <div>Không thể kết nối đến database</div>;

    return (
        <div>
            <Header />
            <Banner />
            {showLoginNotification && (
                <div className="overlay">
                    <div className="notification-box">
                        <span className="close-btn" onClick={() => setShowLoginNotification(false)}>X</span>
                        <div className="notification">Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!</div>
                        <Link to="/signup">đăng nhập</Link>
                    </div>
                </div>
            )}

            <section className="news">
                <div className="container">
                    <div className="section-heading"></div>
                    <div className="section-body">
                        <div className="products">
                            {currentProducts?.map((product: IProduct, index: number) => (
                                <div className="product-item" key={index}>
                                    <div className="product__thumbnail">
                                        <img src={product.image} alt={product.name} />
                                        <span className="product__sale">-50%</span>
                                    </div>
                                    <div className="product-content">
                                        <h3 className="product__name">
                                            <a href="/" className="product__link">
                                                {product.name}
                                            </a>
                                        </h3>
                                        <a className="product__cate">Stylish cafe chair</a>
                                        <div className="product-price">
                                            <span className="product-price__new">{product.price}đ</span>
                                            <span className="product-price__old">3.500.000đ</span>
                                        </div>
                                    </div>
                                    <div className="product-content-extra">
                                        <button className="btn__addtocart" onClick={() => handleAddToCart(product._id)}>Add to cart</button>
                                        <div>
                                            <Link to={`/product/${product._id}`} className="btn__detail">Xem Chi Tiết</Link>
                                        </div>
                                        <div className="share-like-container">
                                            <span><i className="fas fa-share"></i>Share</span>
                                            <span><i className="far fa-thumbs-up"></i>Like</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="product-list-clickz">
                {Array.from({ length: Math.ceil(productsData?.length / productsPerPage) }, (_, i) => (
                    <div className="product-list__box1" key={i}>
                        <a href="#" onClick={() => paginate(i + 1)}>{i + 1}</a>
                    </div>
                ))}
            </div>

            <Service />
            <Footer />
        </div>
    );
};

export default ShopPage;
