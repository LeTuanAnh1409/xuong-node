import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div> <footer class="footer">
    <div class="container">
        <div class="footer-list">
            <div class="footer-item">
                <img src="./img/logo.svg" alt="" />
                <p class="footer__address">
                    400 University Drive Suite 200 Coral Gables, FL 33134 USA
                </p>
            </div>
            <div class="footer-nav">
                <div class="footer-item">
                    <h2 class="footer__title">Links</h2>
                    <ul class="footer-menu-list">
                        <li class="footer-menu-item">
                            <a href="" class="footer-menu-link">Home</a>
                        </li>
                        <li class="footer-menu-item">
                            <a href="" class="footer-menu-link">Shop</a>
                        </li>
                        <li class="footer-menu-item">
                            <a href="" class="footer-menu-link">Blog</a>
                        </li>
                        <li class="footer-menu-item">
                            <a href="" class="footer-menu-link">Contact</a>
                        </li>
                    </ul>
                </div>
                <div class="footer-item">
                    <h2 class="footer__title">Help</h2>
                    <ul class="footer-menu-list">
                        <li class="footer-menu-item">
                            <a href="" class="footer-menu-link">Payment Options</a>
                        </li>
                        <li class="footer-menu-item">
                            <a href="" class="footer-menu-link">Returns</a>
                        </li>
                        <li class="footer-menu-item">
                            <a href="" class="footer-menu-link">Privacy Policies</a>
                        </li>
                        <li class="footer-menu-item">
                            <a href="" class="footer-menu-link">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer-item">
                <h2 class="footer__title">Newsletter</h2>
                <form action="" class="newsletter">
                    <input
                        type="text"
                        class="newsletter__input"
                        placeholder="Enter Your Email Address"
                    />
                    <button class="newsletter__btn">Subscribe</button>
                </form>
            </div>
        </div>
        <p class="copyright">2023 furino. All rights reverved</p>
    </div>
</footer></div>  )
}

export default Footer