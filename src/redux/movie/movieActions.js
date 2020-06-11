import {
    CHANGE_PER_PAGE,
    DELETE_MOVIE,
    FETCH_MOVIES,
    FILTER_MOVIES,
    NAVIGATE
} from './movieTypes';
import { movies$ } from '../../movies';

const fetchMovies = movies => {
    return {
        type: FETCH_MOVIES,
        playload: movies
    }
}

export const deleteMovieAction = deletedObject => {
    return {
        type: DELETE_MOVIE,
        playload: deletedObject
    }
}

export const navigateTo = destination => {
    return {
        type: NAVIGATE,
        playload: destination
    }
}
export const filterMoviesAction = selectedCategories => {
    return {
        type: FILTER_MOVIES,
        playload: selectedCategories
    }
}
export const changePerPageNbrAction = nbr => {
    return {
        type: CHANGE_PER_PAGE,
        playload: nbr
    }
}

export const getMovies = () => {
    return function(dispatch) {
        movies$.then(data => {
            dispatch(fetchMovies(data))
        })
    }
}