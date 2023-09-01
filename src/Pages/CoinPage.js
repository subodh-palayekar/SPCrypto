import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {CryptoState} from '../Context/CryptoContext'
import axios from 'axios'
import CoinInfo from '../Components/CoinInfo/CoinInfo'
import './Page.css'
import Spinner from '../Components/Spinner/Spinner'
import ReactHtmlParser from "react-html-parser";
import CoinChart from '../Components/CoinsChart/CoinChart'
import ChartButton from '../Components/ChartButton/ChartButton'
import { SingleCoin } from '../Config/api'


const CoinPage = () => {

    const {id} = useParams();
    console.log(id);
    const[coin,setCoin] = useState();
    const{currency,symbol} = CryptoState();
    

    const fetchCoin = async ()=>{
        const {data} = await axios.get(SingleCoin(id))
        setCoin(data);
    }
    
    useEffect(()=>{
        fetchCoin();
        console.log(coin)
    },[currency])

    if (!coin){
        return <Spinner/>;
    } 


  return (
    <div className='coinpage-container'>
        <div className="sidebar-coininfo">
            <CoinInfo
                image={coin?.image?.large}
                name={coin?.name}
                desc={ReactHtmlParser(coin?.description.en.split(". ")[0])}
                rank={coin?.market_cap_rank}
                price={coin?.market_data.current_price[currency.toLowerCase()]}
                marketCap={ coin?.market_data.market_cap[currency]}
            />
            </div>
        <div className="sidebar-coinchart">
            <CoinChart id={id}/>
            <ChartButton/>
        </div>
    </div>
  )
}

export default CoinPage
