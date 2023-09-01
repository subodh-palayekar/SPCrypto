import React from 'react'
import "./carousel.css"
import  { CryptoState } from '../../Context/CryptoContext';
import { Link } from 'react-router-dom';

const SliderCoin = ({image,CryptoSymbol,percentage,price,id}) => {

  const {symbol} = CryptoState();
  const profit = percentage>0;

  function numberWithCommas(x) {
    if(!x){ return ''}
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  return (
    <div>
      <Link className='coin-container' to={`/coins/${id}`}>
      <img className='coin-img' src={image}/>
      <span className='coin-symbol'> {CryptoSymbol?.toUpperCase()}
       <span className='coin-percentage' style={{
                                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                fontWeight: 600,
                                            }}> {percentage}</span></span>
      <span className='coin-price'>{symbol}{numberWithCommas(price)}</span>
    </Link>
    </div>
  )
}

export default SliderCoin
