import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/series");
    else if (value === 3) navigate("/search");
  }, [value, navigate]);

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0, backgroundColor: "rgb(53, 53, 67)", zIndex: 100}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction style={{ color: "yellow", backgroundColor: "rgb(53, 53, 67)" }} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction style={{ color: "yellow", backgroundColor: "rgb(53, 53, 67)" }} label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction style={{ color: "yellow", backgroundColor: "rgb(53, 53, 67)" }} label="TvSeries" icon={<TvIcon />} />
        <BottomNavigationAction style={{ color: "yellow", backgroundColor: "rgb(53, 53, 67)" }} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}
