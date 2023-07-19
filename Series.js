import React from 'react';
import { useState, useEffect } from 'react';
import useGenres from '../../hooks/useGenre';
import axios from 'axios';
import SingleContent from '../../components/singlecontent/SingleContent';
import Genres from '../../components/Genres';
import CustomPagination from '../../components/pagination/CustomPagination';




const Series = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const includedGenres = useGenres(selectedGenres)
  const fetchMovies = async () => {
      const { data } = await axios.get('https://api.themoviedb.org/3/discover/tv', {
        params: {
          language: 'en-US',
          page: page,
          include_adult: false,
          include_video: false,
          sort_by: 'popularity.desc',
          with_genres: selectedGenres.join('28,35,18'),
        },
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2JhNzI0OGZhMjliOTIwZjA1YjQwMzI0Mzg3Y2M3NiIsInN1YiI6IjYzYTliNmRhYTZhNGMxMDA4MDk3ZWQ5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BbBfdYIhtqO8lBUk675ehKt_vc5XZdM_NhEO8MdOVv8', 
          Accept: 'application/json',
        },
      });

      setContent(data.results);
      setNumOfPages(data.total_pages);
// console.log(data);
};

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page,includedGenres]);

  return (
    <div>
    <span className='pageTitle'>TV-Series</span>

    <Genres 
      type = "tv" 
      selectedGenres = {selectedGenres}
      setSelectedGenres = {setSelectedGenres}
      genres = {genres}
      setGenres = {setGenres}
      setPage = {setPage}
      includedGenres="28,35,18"
      
      />

    <div className='trending'>
      {content && content.map((c) => 
        <SingleContent 
        key={c.id}
        id={c.id}
        poster={c.poster_path}
        title={c.title || c.name}
        date={c.first_air_date || c.release_date} 
        media_type="tv"
        vote_average={c.vote_average}
        />  
      )}
      </div>
      {numOfPages > 1 && (
        
        <CustomPagination setPage={setPage} numOfPages = {numOfPages}/>
)}

    </div>

    
  )
}

export default Series;