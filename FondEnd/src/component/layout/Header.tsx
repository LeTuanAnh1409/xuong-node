import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo">
            <img src="./img/logo.svg" alt="" />
          </Link>
          <nav className="main-menu">
            <ul className="main-menu__list">
              <li className="main-menu__item">
                <Link to="/" className="main-menu__link">
                  Home
                </Link>
              </li>
              <li className="main-menu__item">
                <Link to="/product" className="main-menu__link">
                  Shop
                </Link>
              </li>
              <li className="main-menu__item">
                <Link to="/about" className="main-menu__link">
                  About
                </Link>
              </li>
              <li className="main-menu__item">
                <Link to="/contact" className="main-menu__link">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header-block">
            <div className="user">
              <Link to="signup" className="fas fa-user"></Link>
            </div>
            <div className="search">
              <i className="fas fa-search"></i>
            </div>
            <div className="wishlist">
              <i className="fas fa-heart"></i>
            </div>
            <div className="cart">
              <Link to="cart" className="fas fa-shopping-cart"></Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
