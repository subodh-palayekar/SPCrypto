import React, { useEffect, useState } from 'react'
import "./Table.css";
import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import { CryptoState } from '../../Context/CryptoContext';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { CoinList } from '../../Config/api';
import { TableDummy } from '../../Config/dummyData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table = () => {

    const [tableData,setTableData] = useState([]);
    const [search,setSearch] = useState("");
    const{page,currency,symbol} = CryptoState();
    const [loading,setLoading] = useState(false);

    
    const fetchCoins = async ()=>{
        try{
            const {data} = await axios.get(CoinList(currency),{
                headers: {
                    'X-Requested-With': 'XMLHttpRequest', // Optional header for some proxies
                    'Access-Control-Allow-Origin': '*', // Set the appropriate CORS header
                  },
                  proxy: {
                    host: "https://cors-anywhere.herokuapp.com",
                  },
            });
            setTableData(data);
            setLoading(true);
        } catch(e){
            console.log("Table Data Api is Down " + e.message);
            setTableData(TableDummy);
            setLoading(true);
            toast.info('Table Api is Down Loading Dummy Data', {
                toastId:2,
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
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleSearch = () => {
        return tableData.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };
    
    useEffect(()=>{
        fetchCoins();
    },[currency])

    if(!tableData | loading===false) return <Spinner/>

     
    return (
        
    <div className='container'>
    <div className='table-container'>
      <h2 className='table-title'>Cryptocurrency Prices by Market Cap</h2>
        <div className="search-container">
        <input type="text" className="search-input" onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search for Crypto"/>
        </div>

        <div className="main-table table-responsive">
            <table className="table custom-table table-hover">
                <thead  className='py-3'>
                    <tr >
                    <th className='fs-3 align-middle' style={{paddingLeft :'70px'}} scope="col">Coin</th>
                    <th  className='fs-3 align-middle' scope="col">Price</th>
                    <th className='fs-3 align-middle' scope="col">24H Change</th>
                    <th  className='fs-3 align-middle' scope="col">Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    { handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row)=>{
                        const profit = row.price_change_percentage_24h > 0;
                        return (

                        <tr  className='table-dark' key={row.symbol}>
                            <td className= "text-start ">
                                    <Link to={`/coins/${row.id}`}>
                                    <div className="table-cell-coin text-start">
                                        <img src={row?.image} alt="" />
                                        <div className="table-cell-coin-det">
                                            <span className='cell-symbol'>{row.symbol}</span>
                                            <span className='cell-name'>{row.name}</span>
                                        </div>
                                    </div>
                                    </Link>    
                                </td>
                                <td className= "align-middle">
                                    <div className="table-cell-price">
                                        <span className="cell-price">
                                             {symbol}{" "}
                                            {numberWithCommas(row.current_price.toFixed(2))}
                                        </span>
                                    </div>
                                </td>
                                <td className= "align-middle">
                                    <div className="table-cell-price ">
                                        <span className="cell-price "
                                         style={{
                                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                fontWeight: 500,
                                            }}>{profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%
                                        </span>
                                    </div>
                                </td>
                                <td className= "align-middle">
                                    <div className="table-cell-price">
                                        <span className="cell-price">${" "}
                                            {numberWithCommas(
                                                row.market_cap.toString().slice(0, -6)
                                            )}M
                                        </span>
                                    </div>
                                </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
        </div>
        <Pagination size={tableData.length}/>
        <ToastContainer/>
    </div>
  )
}

export default Table
