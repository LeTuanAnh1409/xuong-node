import React from 'react'

type Props = {}

const Service = (props: Props) => {
  return (
    <section className="service">
    <div className='col1'>
      <i className="fas fa-trophy"></i>
      <div>
        <h2>High Quality</h2>
        <p>crafted from top materials</p>
      </div>
    </div>
    <div className='col1'>
      <i className="fas fa-shield-alt"></i>
      <div>
        <h2>Warranty Protection</h2> 
        <p>Over 2 years</p>
      </div>
    </div>
    <div  className='col1'>
      <i className="fas fa-truck"></i>
      <div>
        <h2>Free Shipping</h2>
        <p>Order over 150 $</p>
      </div>
    </div>
    <div  className='col1'>
      <i className="fas fa-headset"></i>
      <div>
        <h2>24 / 7 Support</h2>
        <p>Dedicated support</p>
      </div>
    </div>
  </section>  )
}

export default Service