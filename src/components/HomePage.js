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

    const deleteMovie = (e,id) => {
        const res = window.confirm('Are you sure you wanna delete this movie ?')
        const tab = [...movieList.filter(item => item.id  !== id)]

        res && setMovieList(tab) 
    }

    return (
        <div>
            {loading && <h3>loading...</h3>}
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: '1100px', margin: 'auto'}}>
                {movieList.map(item => <MovieCard key={item.id} movie={item} handleDelete={deleteMovie}/>)}
            </div>
        </div>
    );
};

export default HomePage;