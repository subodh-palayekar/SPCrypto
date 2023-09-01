import React from 'react'
import './Banner.css'
import Slider from '../Carousel/Slider'
import Navbar from '../Nav/Navbar'
import bannerlogo from '../../Assets/bannerlogo.png'

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
              src={bannerlogo}
              alt="crypto"
            />
        </div>
      </div>
      <Slider />
    </div>
  );
}

export default Banner
