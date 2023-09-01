import React from 'react'
import  "./Navbar.css"
import { CryptoState } from '../../Context/CryptoContext'
import { Link } from 'react-router-dom'
import logo1 from "../../Assets/logo1.png"
import logo2 from "../../Assets/logo2.png"


const Navbar = () => {

  const {currency,setCurrency} = CryptoState();

  const handleSelect = (value) => {
    setCurrency(value);
    console.log(currency);
  }

  return (
    <div className='navbar-container'>
        <div className="navbar">
          <Link to="/" className="navbar-logo" ><img src={logo1}/></Link>
          <div className="navbar-right">
            <label htmlFor="currency"></label>
            <select onChange={(e)=>handleSelect(e.target.value)} id="currency" className="custom-select">
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
    </div>
  )
}

export default Navbar
