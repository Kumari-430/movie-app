import { Pagination } from '@mui/material';
import React from 'react';
const CustomPagination = ({setPage, numOfPages}) => {
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
      };

  return (
    <div style={{width:"100%", display:'flex', justifyContent:'center', marginTop:'10px'}}>
    <Pagination count={numOfPages = (10)}
     hideNextButton
     hidePrevButton
    color = "primary" 
    variant="outlined"
    shape="rounded" 
    size="small" 
    onClick={(e) => handlePageChange(e.target.textContent) }/>
    </div>
  )
}

export default CustomPagination;