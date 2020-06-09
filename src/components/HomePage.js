import React, { useEffect, useState } from 'react';
import { movies$ } from '../movies';
import MovieCard from './MovieCard';

const HomePage = () => {

    const [movieList, setMovieList] = useState([])
    const [loading, setLoading] = useState(true)
    // const [movieList, setMovieList] = useState([])

    useEffect(() => {
        movies$
		.then(data => {
            setMovieList(data);
            setLoading(false)    
        })
        return () => {
            
        }
    }, [movies$])

    return (
        <div>
            {loading && <h3>loading...</h3>}
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: '1100px', margin: 'auto'}}>
                {movieList.map(item => <MovieCard key={item.id} movie={item}/>)}
            </div>
        </div>
    );
};

export default HomePage;