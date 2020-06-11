import React, { useEffect } from 'react';
import MovieCard from './MovieCard';
import CategoryFilter from './CategoryFilter';
import Pagination from './Pagination';
import '../assets/App.css';
import  { connect }  from 'react-redux';
import { 
    getMovies,
    deleteMovieAction,
    changePerPageNbrAction,
    filterMoviesAction,
    navigateTo
 } from '../redux/movie/movieActions';

const HomePage = ({movieData, getMovies, deleteMovie, navigate, handleNbrPerPage, selectCategory}) => {

    useEffect(() => {
        getMovies()

        return () => {
            
        }
    }, [getMovies])

    const startIndex = (movieData.pageNumber - 1) * movieData.perPage 
    const endIndex = startIndex +  movieData.perPage
    const newMoviesArray = movieData.filteredMovies.map(item => <MovieCard key={item.id} movie={item} handleDelete={deleteMovie}/>).slice(startIndex, endIndex)
    return (
        <div className="Main">
            <Pagination selectNbr={handleNbrPerPage} nbrResult={movieData.perPage} paginationHandler={navigate}/>
            <CategoryFilter  categries={movieData.categoryList} handleSelect={selectCategory} selectedCategory={movieData.selectedCat}/>
            {movieData.loading && <h3>loading...</h3>}
            <div className="Container">
                {newMoviesArray}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        movieData: state.movie
    }
}

const mapsDispatchToprops = dispatch => {
    return {
        getMovies: () => dispatch(getMovies()),
        deleteMovie: (deletedMovie) => dispatch(deleteMovieAction(deletedMovie)),
        navigate: (dest) => dispatch(navigateTo(dest)),
        handleNbrPerPage: (nbr) => dispatch(changePerPageNbrAction(nbr)),
        selectCategory: selectedCat => dispatch(filterMoviesAction(selectedCat)),
    }
}

export default connect(
    mapStateToProps,
    mapsDispatchToprops
)(HomePage);