import React from 'react'
import './Banner.css'
import Slider from '../Carousel/Slider'
import Navbar from '../Nav/Navbar'

const Banner = () => {
  return (
    <div className='back-img'>
      <div className="banner-container container">
        <div className="banner-left">
          <h1 className="banner-left-title">SP Crypto</h1>
          <span className="sub-heading">
            Get All The Info Regarding Your Favorite Crypto Currency
          </span>
        </div>
        <div className="banner-right">
            <img
              className="banner-img"
              src="http://wp.dreamitsolution.net/cryptozen/wp-content/uploads/2022/04/one.png "
              alt="crypto"
            />
        </div>
      </div>
      <Slider />
    </div>
  );
}

export default Banner
