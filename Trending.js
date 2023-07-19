import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SingleContent from '../../components/singlecontent/SingleContent';
import './Trending.css';
import CustomPagination from '../../components/pagination/CustomPagination';
const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get('https://api.themoviedb.org/3/trending/all/week', {
      params: {
        language: 'en-US',
        page : page, //Pass the current page to the API request
      },
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2JhNzI0OGZhMjliOTIwZjA1YjQwMzI0Mzg3Y2M3NiIsInN1YiI6IjYzYTliNmRhYTZhNGMxMDA4MDk3ZWQ5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BbBfdYIhtqO8lBUk675ehKt_vc5XZdM_NhEO8MdOVv8',
        Accept: 'application/json',
      },
    });
    // console.log(data.results);
    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);// Call fetchTrending whenever the page changes

  return (
    <div>
      <span className='pageTitle'>Trending</span>
      <div className='trending'>
      {content && content.map((c) => 
        <SingleContent 
        key={c.id}
        id={c.id}
        poster={c.poster_path}
        title={c.title || c.name}
        date={c.first_air_date || c.release_date} 
        media_type={c.media_type}
        vote_average={c.vote_average}
        />  
      )}
      </div>
    <CustomPagination setPage={setPage}/>
    </div>
  );
};

export default Trending;
