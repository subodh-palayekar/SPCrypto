import React from 'react'
import './Pagination.css'
import { CryptoState } from '../../Context/CryptoContext';

const Pagination = ({size}) => {
    size = size/10;
    const {page,setPage} = CryptoState();

    const handlePageSelect =(selectedPage)=>{
        if(selectedPage>=1 && selectedPage<=size){

            setPage(selectedPage);
            window.scroll(0,600)
        }
        
    }

  return (
    <div className=' pagination table-responsive pagination-container'>
    <span onClick={()=>handlePageSelect(page-1)} className='prev'> {"<"} </span>
      
      {Array.from({ length: size }, (_, index) => (
        <span 
            className={page === index+1 ? "page-no selected small-screen" : "page-no small-screen"}
            onClick={()=>handlePageSelect(index+1)} 
            key={index + 1} 
            >
          {index + 1}
        </span> 
      ))} 
      <span className=  "page-no small-screen-pagination">{page}</span>
       <span onClick={()=>handlePageSelect(page+1)} className='name'>{">"} </span>
    </div>
  )
}

export default Pagination
