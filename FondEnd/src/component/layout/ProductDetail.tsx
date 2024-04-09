import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import useLocalStorage from '../../hook/useStorage';
import Footer from './Footer';
import Header from './Header';
import Service from './Service';
import { Link } from 'react-router-dom';
const ProductDetail = () => {

    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const [showNotification, setShowNotification] = useState(false);
    const { id } = useParams();

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ['PRODUCT', id],
        queryFn: async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/products/${id}`);
                return data;
            } catch (error) {
                console.error(error);
                throw new Error("Error fetching data");
            }
        },
    });

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
    const [showLoginNotification, setShowLoginNotification] = useState(false);
    const handleAddToCart = (productId: string) => {
        if (!userId) {
            setShowLoginNotification(true);
        } else {
            addToCartMutation({ productId, quantity: 1 });
        }
    };


    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (isError) {
        return <div className="error">Error fetching data</div>;
    }

    return (
        <>
            <Header />
            <section className="detail">

                <div className="container">
                    <div className="detail-product">
                        <div className="detail-image">
                            <div className="detail-image-left">
                                <div className="detail-image-left__sp"> <img src="https://picsum.photos/100/100" alt="" /></div>
                                <div className="detail-image-left__sp"> <img src="https://picsum.photos/100/100" alt="" /></div>
                                <div className="detail-image-left__sp"> <img src="https://picsum.photos/100/100" alt="" /></div>
                                <div className="detail-image-left__sp"> <img src="https://picsum.photos/100/100" alt="" /></div>
                            </div>
                            <div className="detail-image-right">
                                {product && <img src={product.image} alt={product.name} />}
                            </div>
                        </div>
                        <div className="detail-twoblock">
                            <div className="detail-text">
                                <h3>{product && product.name}</h3>
                                <p className="detail-text__vd">{product && product.price}đ</p>
                                <div className="detail-text-customer">
                                    <div className="detail-text-review">
                                        <p>{product && product.description}</p>

                                        <div className="rate">
                                            <input type="radio" id="star5" name="rate" defaultValue={5} defaultChecked />
                                            <label htmlFor="star5" title="text"></label>
                                            <input type="radio" id="star4" name="rate" defaultValue={4} defaultChecked />
                                            <label htmlFor="star4" title="text"></label>
                                            <input type="radio" id="star3" name="rate" defaultValue={3} defaultChecked />
                                            <label htmlFor="star3" title="text"></label>
                                            <input type="radio" id="star2" name="rate" defaultValue={2} defaultChecked />
                                            <label htmlFor="star2" title="text"></label>
                                            <input type="radio" id="star1" name="rate" defaultValue={1} defaultChecked />
                                            <label htmlFor="star1" title="text"></label>
                                        </div>

                                    </div>
                                </div>
                                <div className="detail-text-size">
                                    <p className="detail-text__size">size</p>
                                    <div className="detail-zize-list">
                                        <div className="detail-size__box">
                                            <p>L</p>
                                        </div>
                                        <div className="detail-size__box">
                                            <p>XL</p>
                                        </div>
                                        <div className="detail-size__box">
                                            <p>XS</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="detail-text-color">
                                    <p className="detail-text__size">color</p>
                                    <div className="detail-color-list">
                                        <div className="detail-color__box1"></div>
                                        <div className="detail-color__box2"></div>
                                        <div className="detail-color__box3"></div>
                                    </div>
                                </div>
                                {showNotification && <div className="notification">Sản phẩm đã được thêm vào giỏ hàng thành công!</div>}
                                {showLoginNotification && (
                                    <div className="overlay">
                                        <div className="notification-box">
                                            <span className="close-btn" onClick={() => setShowLoginNotification(false)}>X</span>
                                            <div className="notification">Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!</div>
                                            <Link to="/signin">đăng nhập</Link>
                                        </div>
                                    </div>
                                )}
                                <div className="detail-button-add">
                                    <div className="detail-button-sl">
                                        <p>-</p>
                                        <p>1</p>
                                        <p>+</p>
                                    </div>
                                    <div >

                                        <button className="detail-button-lick" onClick={() => handleAddToCart(product._id)}>Add To Cart</button>

                                    </div>
                                    <div>
                                        <button className="detail-button-out">Check Out</button>

                                    </div>
                                </div>
                            </div>
                            <div className="detail-parameter-pro">
                                <div className="detail-parameter-left">
                                    <p>SKU</p>
                                    <p>Category</p>
                                    <p>Tags</p>
                                    <p>Share</p>
                                </div>
                                <div className="detail-parameter-right">
                                    <p>:&ensp;SS001</p>
                                    <p>:&ensp;Sofas</p>
                                    <p>:&ensp;Sofa, Chair, Home, Shop</p>
                                    <p>:&ensp; <img src="./img/face.svg" alt="" />
                                        <img src="./img/im.svg" alt="" />
                                        <img src="./img/twiter.svg" alt="" />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Outlet />
            <Service />
            <Footer />
        </>
    );
}

export default ProductDetail;
