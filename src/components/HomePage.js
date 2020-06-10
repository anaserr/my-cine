import React, { useEffect, useState } from 'react';
import { movies$ } from '../movies';
import MovieCard from './MovieCard';
import CategoryFilter from './CategoryFilter';
import '../assets/App.css';

const HomePage = () => {

    const [movieList, setMovieList] = useState([])
    const [loading, setLoading] = useState(true)
    const [categoryList, setCategoryList] = useState([])
    const [selectedCat, setSelectedCat] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([])

    useEffect(() => {
        movies$
		.then(data => {
            setMovieList(data)
            setLoading(false)

            //set FiltredMovies to all movies at the beginning
            if(selectedCat.length === 0 ){
                 setFilteredMovies(data)

                //fill category array
                let catArray = [...new Set(data.map(movie => movie.category))]
                setCategoryList(catArray.map(item => {
                    return {label: item, value: item}
                }))
            }
        })

        return () => {
            
        }
    }, [selectedCat])

    const deleteMovie = (deletedMovie) => {
        const res = window.confirm('Are you sure you wanna delete this movie ?')
        const newMovies = [...movieList.filter(item => item.id  !== deletedMovie.id)]

        if(res){
            setMovieList(newMovies)
            setFilteredMovies(newMovies)
            const newCategories = [...categoryList.filter(cat => cat.value !== deletedMovie.category)]
            newMovies.every(item => item.category  !== deletedMovie.category) && setCategoryList(newCategories)
        }
    }

    const selectCategory = (e) => {
        
        setSelectedCat(e)
        const tab = e.map(item => item.value)
        const newArray = movieList.filter(item => tab.includes(item.category))
        console.log(categoryList)
        setFilteredMovies(newArray)
    }

    return (
        <div>
            <CategoryFilter  categries={categoryList} handleSelect={selectCategory} selectedCategory={selectedCat}/>
            {loading && <h3>loading...</h3>}
            <div className="Container">
                {filteredMovies.map(item => <MovieCard key={item.id} movie={item} handleDelete={deleteMovie}/>)}
            </div>
        </div>
    );
};

export default HomePage;