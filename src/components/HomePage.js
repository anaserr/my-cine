import React, { useEffect, useState } from 'react';
import { movies$ } from '../movies';
import MovieCard from './MovieCard';
import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';
import '../assets/App.css';

const HomePage = () => {

    const [movieList, setMovieList] = useState([])
    const [loading, setLoading] = useState(true)
    const [categoryList, setCategoryList] = useState([])
    const [selectedCat, setSelectedCat] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([])
    const [perPage, setPerPage] = useState(12)
    const [pageNumber, setPageNumber] = useState(1)

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

    //delete a movie
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

    //select category handler
    const selectCategory = (e) => { 
        setSelectedCat(e)
        const tab = e.map(item => item.value)
        const newArray = movieList.filter(item => tab.includes(item.category))
        setFilteredMovies(newArray)
    }

    const handleNbrPerPage = (e) => {
        setPerPage(Number.parseInt(e.target.id,10))
        setPageNumber(1)
    }

    //next /previous navigation handler
    const navigate = (e) => {
        const action = e.target.name;
        let totalPage = Math.floor(filteredMovies.length / perPage)
        if(filteredMovies.length % perPage !== 0) totalPage++
        setPageNumber(prevNbr => {
            if(action === 'next' && prevNbr < totalPage){
                return prevNbr + 1
            }else if(action === 'previous' && 1 < prevNbr){
                return prevNbr - 1
            }else return prevNbr
        })
    }

    const newMoviesArray = filteredMovies.map(item => <MovieCard key={item.id} movie={item} handleDelete={deleteMovie}/>).slice((pageNumber-1)*perPage, ((pageNumber-1)*perPage)+perPage)
    return (
        <div className="Main">
            <Pagination selectNbr={handleNbrPerPage} nbrResult={perPage} paginationHandler={navigate}/>
            <CategoryFilter  categries={categoryList} handleSelect={selectCategory} selectedCategory={selectedCat}/>
            {loading && <h3>loading...</h3>}
            <div className="Container">
                {newMoviesArray}
            </div>
        </div>
    );
};

export default HomePage;