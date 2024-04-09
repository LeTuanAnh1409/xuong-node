import Banner from './layout/Banner'
import Blog from './layout/Blog'
import Footer from './layout/Footer'
import Header from './layout/Header'
import Service from './layout/Service'
import Shop from './layout/Shop'

const LayoutWebsite = () => {
  return (
    <div>
        <Header/>
        <Banner/>
        <Shop/>
        <Blog/>
        <Service/>
        <Footer/>
    </div>
  )
}

export default LayoutWebsite