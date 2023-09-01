import React, { useEffect } from 'react'
import SliderCoin from './SliderCoin';
import Carousel from 'react-multi-carousel';
import { useState } from 'react';
import axios from 'axios';
import 'react-multi-carousel/lib/styles.css';
import { CryptoState } from '../../Context/CryptoContext';
import { TrendingCoins } from '../../Config/api';
import { Trend } from '../../Config/dummyData';
import Spinner from '../Spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Slider =() => {

    const [trending, setTrending] = useState([]);
    const {currency} = CryptoState();
    const[loading,setLoading] = useState(false);

    const fetchTrend = async () => {
      try {
        const response = await axios.get(TrendingCoins(currency));
        setTrending(response.data);
        setLoading(true); 
       
          
      } catch (e) {
        console.log('Carousel Api is Down: using dummy data'+ e.message );
        setTrending(Trend);
        setLoading(true);
        toast.info('Carousel Api is Down Loading Dummy Data', {
          toastId:1,
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    };
    

    
    useEffect(()=>{
        fetchTrend();
    },[currency])

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1024 },
        items: 4
      },
      desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 800, min: 560 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 560, min: 0 },
        items: 1
      }
    };

    if(!trending | loading==false){
      return(<Spinner/>)
    }


    
      const  coins = trending.map((data)=>{
            return (
                <SliderCoin
                id={data.id}
                key={data.image}  
                image={data.image} 
                CryptoSymbol={data.symbol}
                percentage={data.price_change_percentage_24h}
                price={data.current_price}
                />
            )
      })

  return (
    <>
    <div id='top-routes'  className='container-carousel' >
        <Carousel  autoPlay={true} infinite={true} autoPlaySpeed={3000} responsive={responsive}>
          {coins}
        </Carousel>
      </div>
      <ToastContainer/>
    </> 
  )
}

export default Slider
