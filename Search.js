import { Button } from '@mui/base';
import { Tab, Tabs, TextField, ThemeProvider} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import CustomPagination from '../../components/pagination/CustomPagination';
import SingleContent from '../../components/singlecontent/SingleContent';

const Search = () => {
  const [type,setType] = useState(0);
  // eslint-disable-next-line
  const [page, setPage] = useState(1); 
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette:{
      type:"dark",
      primary:{
        main:'#fff',
      },
    },
  });

const fetchSearch = async() => {
  try {
    const {data} = await axios.get('https://api.themoviedb.org/3/search/multi', {
    
  params: {
    query: searchText,
    language: 'en-US',
    include_adult: false,
    page: page,
    type: type === 0 ? 'movie' : 'tv',
    api_key :'dcba7248fa29b920f05b40324387cc76',
  },
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2JhNzI0OGZhMjliOTIwZjA1YjQwMzI0Mzg3Y2M3NiIsInN1YiI6IjYzYTliNmRhYTZhNGMxMDA4MDk3ZWQ5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BbBfdYIhtqO8lBUk675ehKt_vc5XZdM_NhEO8MdOVv8',
    Accept: 'application/json',
  },

  })

setContent(data.results);
setNumOfPages(data.total_pages);
  }catch (error) {
    console.error(error);
  }
};


useEffect(() =>{
  window.scroll(0,0);
  fetchSearch();
   // eslint-disable-next-line
}, [type, page])

  return (
    <div>
    <ThemeProvider theme={darkTheme}>
    
    <div className='search' style={{display:'flex', margin:'15px 0'}}>
      <TextField 
      style={{flex:1}}
      className='searchBox'
      label='Search'
      variant='filled'
      onChange={(e) => setSearchText(e.target.value)}
     />
     <Button
      variant='contained'
       style={{marginLeft:'10', cursor: 'pointer'}}
       onClick={fetchSearch}><SearchIcon fontSize='large'/></Button>
     </div>

     <Tabs 
     value={type} 
     indicatorColor='primary' 
     textColor='primary'
     onChange={(event, newValue) => {
       setType(newValue);
       setPage(1);
     }} style={{paddingBottom:5}}  aria-label="disabled tabs example">
     
     <Tab style={{width:'50%', color:'white'}} label='Search Movies'/>
     <Tab style={{width:'50%', color:'white'}} label='Search Tv Series'/>
      </Tabs>
</ThemeProvider>  

     <div className='trending'>
     {content && content.map((c) => 
       <SingleContent
       key={c.id}
       id={c.id}
       poster={c.poster_path}
       title={c.title || c.name}
       date={c.first_air_date || c.release_date} 
       media_type={type? 'tv' : 'movie'}
       vote_average={c.vote_average}
       />  
     )}
     {searchText && !content && (
      type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>
     )}
     </div>
     {numOfPages > 1 && (
       
       <CustomPagination setPage={setPage} numOfPages = {numOfPages}/>
)}
</div>
  )
}
export default Search;
