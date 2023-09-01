import React from 'react'
import "./CoinInfo.css"
import { CryptoState } from '../../Context/CryptoContext'
import Spinner from '../Spinner/Spinner';

const CoinInfo = ({image,name,desc,rank,price,marketCap}) => {

    const{symbol} = CryptoState();
     function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

   
        
  return (
    <div className='coininfo-container'>
      <img className="coininfo-image" src={image} />
      <span className='coininfo-name'>{name}</span>
      <p className='coininfo-details'>{desc}</p>
      <div className="coininfo-stats">
        <span className="stats">Rank : <span className="rank">{rank}</span> </span>
        <span className="stats">Price : <span className="price">{symbol}{numberWithCommas(price)}</span> </span>
        {/* <span className="stats">Market Cap : <span className="market">{symbol}{numberWithCommas(marketCap)}M</span> </span> */}
      </div>
    </div>
  )
}

export default CoinInfo
