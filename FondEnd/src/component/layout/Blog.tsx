
type Props = {}

const Blog = (props: Props) => {
  return (
    <section className="blog">
    <div className="section-heading">
        <h2 className="section-heading__title">Blog</h2>
    </div>
    <div className="section-body">
        <div className="col">
            <img src="./img/Rectangle 67.png" alt="" />
        </div>
        <div className="row">
            <h3>THE ULTIMATE SOFA BUYING GUIDE</h3>
            <p>The versatility of our living space is more crucial than ever. But
                buying a sofa might be a difficult undertaking. Your needs and the
                size of your living area will determine everything, However, don’t
                worry, were are here to help yo</p>
            <a href="">ABOUT</a>
        </div>
    </div>
    <div className="section-body">
        <div className="col">
            <img src="./img/Rectangle 67.png" alt="" />
        </div>
        <div className="row">
            <h3>A BEDROOM MUST HAVE SOME THING LIKE THIS</h3>
            <p>Your level of comfort when geting into and out of bed can be greatly influenced by the bed frame you choose. It may significantly affect how  want your bedroom to feet and look</p>
            <a href="">ABOUT</a>
        </div>
    </div>
    <div className="section-body">
        <div className="col">
            <img src="./img/Rectangle 68.png" alt="" />
        </div>
        <div className="row">
            <h3>WHY IS A TV CONSOLE A MUST IN EVERY HOUSE</h3>
            <p>People do a lot of research to make sure they purchase the ideal
                televisoin. And like the rest of us, you want to keep that gorgeous flat srceen in your living or bedroom on a table or stand</p>
            <a className="about_link" href="">ABOUT</a>
        </div>
    </div>

</section>  )
}

export default Blog