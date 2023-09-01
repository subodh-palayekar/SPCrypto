import React from 'react'
import './ChartButton.css'
import { useState } from 'react'
import { CryptoState } from '../../Context/CryptoContext'

const ChartButton = () => {

    const {setDays} = CryptoState();
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (days) => {
      setDays(days);
      setSelectedButton(days);
    };
   
    
  return (
    <div  className='chart-btn-container'>
      <button type="button" onClick={() => handleButtonClick(1)} className={`btn btn-dark chart-btn ${selectedButton === 1 ? 'selected' : ''}`}>24 Hours</button>
      <button type="button" onClick={() => handleButtonClick(30)} className={`btn btn-dark chart-btn ${selectedButton === 30 ? 'selected' : ''}`}>30 Days</button>
      <button type="button" onClick={() => handleButtonClick(90)} className={`btn btn-dark chart-btn ${selectedButton === 90 ? 'selected' : ''}`}>3 Month</button>
      <button type="button" onClick={() => handleButtonClick(365)} className={`btn btn-dark chart-btn ${selectedButton === 365 ? 'selected' : ''}`}>1 Year</button>
    </div>
  )
}

export default ChartButton
