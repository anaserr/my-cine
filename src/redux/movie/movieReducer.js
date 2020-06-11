import {
    FETCH_MOVIES,
    FILTER_MOVIES,
    CHANGE_PER_PAGE,
    NAVIGATE,
    DELETE_MOVIE
} from './movieTypes';

const initialeState = {
    movieList: [],
    loading:  true,
    categoryList: [],
    selectedCat: [],
    filteredMovies: [],
    perPage: 12,
    pageNumber: 1,
}

const movieReducer = (state = initialeState, action) => {
    switch(action.type){
        case FETCH_MOVIES:
            //fill category array
            let catArray = [...new Set(action.playload.map(movie => movie.category))].map(item => {
                return {label: item, value: item}
            })

            return {
                ...state,
                loading: false,
                movieList: action.playload,
                filteredMovies: (state.selectedCat.length === 0 ) ? action.playload : state.filteredMovies,
                categoryList: (state.selectedCat.length === 0 ) ? catArray : state.categoryList
            }
        case CHANGE_PER_PAGE:
            return {
                ...state,
                pageNumber: 1,
                perPage: Number.parseInt(action.playload),
            }
        case FILTER_MOVIES:
            const tab = action.playload.map(item => item.value)
            const newArray = state.movieList.filter(item => tab.includes(item.category))
            return {
                ...state,
                selectedCat: action.playload,
                filteredMovies: newArray
            }
        case DELETE_MOVIE:
            const newMovies = [...state.movieList.filter(item => item.id  !== action.playload.id)]

            const newCategories = [...state.categoryList.filter(cat => cat.value !== action.playload.category)]
            const condition = newMovies.every(item => item.category  !== action.playload.category)
            const res = window.confirm('Are you sure you wanna delete this movie ?')
            return res ? {
                ...state,
                movieList: newMovies,
                filteredMovies: newMovies,
                categoryList: condition ? newCategories : state.categoryList
            } : state
        case NAVIGATE:
            const dest = action.playload;
            let totalPage = Math.floor(state.filteredMovies.length / state.perPage)
            if(state.filteredMovies.length % state.perPage !== 0) totalPage++
            
            let newPageNumber = state.pageNumber
            if(dest === 'next' && newPageNumber < totalPage){
                newPageNumber++
            }else if(dest === 'previous' && 1 < newPageNumber){
                newPageNumber--
            }
            return {
                ...state,
                pageNumber: newPageNumber
            }
        default: 
            return state
    }
}

export default movieReducer;