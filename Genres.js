import { Chip } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Genres = ({
    includedGenres,
    selectedGenres,
    setSelectedGenres,
    type,
    setPage,
}) => {
    const [genres, setGenres] = useState ([]);
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };

    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !==genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    }

    const fetchGenres = async () => {
    const {data} = await axios.get('https://api.themoviedb.org/3/genre/movie/list',{
            params: {
                language: 'en-US',
                api_key: 'dcba7248fa29b920f05b40324387cc76',
                with_genres: includedGenres,  
            },
            
        });
        setGenres(data.genres);
    }

//console.log(genres);

    useEffect(() =>{
        fetchGenres();
        return () => {
            setGenres([]);
        }
        // eslint-disable-next-line
    }, []);

  return (
    <div style={{padding: '6px 0'}}>

    {selectedGenres && selectedGenres.map((genre) => (
        <Chip key={genre.id} label={genre.name} 
        style={{
         margin: '3',
    }} 
    color='primary'
    size='small' 
    clickable
    onDelete={() => handleRemove(genre)}/>
      ))}

    {genres && genres.map((genre) => (
        <Chip key={genre.id} label={genre.name} 
        style={{
         margin: '3',
         backgroundColor:'white',
         color:'black',
         justifyContent:'space-around'
    }} 
    size='small' 
    clickable onClick={() => handleAdd(genre)}/>
      ))}
    </div>
  )
}

export default Genres;