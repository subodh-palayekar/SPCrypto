import React, { useEffect, useState } from 'react'
import { CryptoState } from '../../Context/CryptoContext';
import { HistoricalChart } from '../../Config/api';
import axios from 'axios';
import "./CoinChart.css"
import Spinner from '../Spinner/Spinner';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
)


const CoinChart = ({id}) => {
  const [historicData,setHistoricData] = useState();
  const {currency,days} = CryptoState();
  const [loading,setLoading] = useState(false)

  const fetchHistoricData = async ()=>{

    try{
      const {data} = await axios.get(HistoricalChart(id,days,currency));
      setHistoricData(data.prices);
      setLoading(true);
    }catch(e){
      console.log("Coin Chart Api is Down " + e.message);
    }
    
  }

  useEffect(()=>{
    fetchHistoricData();
  },[days,currency])

  
  return (
      <div className="coinchart">
        {
          !historicData | loading===false ? (<Spinner/>)
          :(
            <> 
             <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },

                scales: {
                  x: {
                    ticks: {
                      color: 'white', // Change the color of x-axis tick labels
                    },
                  },
                  y: {
                    ticks: {
                      color: 'white', // Change the color of y-axis tick labels
                    },
                  },
                },
              }}
            />
            </>
          )
        }
      </div>
  )
}

export default CoinChart
