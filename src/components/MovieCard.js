import React, { useState } from 'react';
import { faThumbsUp,faThumbsDown, faHeart as faHeartFull, faTrashAlt, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../MovieCard.css'

const MovieCard = ({movie, handleDelete}) => {
    const likesWidth = (100 * movie.likes)/(movie.likes + movie.dislikes) ;
    const dislikesWidth = (100 * movie.dislikes)/(movie.likes + movie.dislikes) ;

    const [liked, setLiked] = useState(null)

    const handleFavorits = (e) => {

        if(liked === true) {
            movie.dislikes++
            movie.likes > 0 && movie.likes--
        } else {
            movie.likes++
            (movie.dislikes > 0 && liked !== null) && movie.dislikes--
        }
        setLiked(prevState =>  !prevState)
        
    }

    return (

        <div className="Card">
            <button className="BtnLike" onClick={handleFavorits}>
                <FontAwesomeIcon icon={liked === null ? faHeart : (liked===true) ? faHeartFull  : faHeartBroken} />
            </button>
            <div className="Title-Cat">
                <div className="Title">{movie.title}</div>
                <div className="Cat" >{movie.category}</div>
            </div>
            
            <button onClick={(e)=>handleDelete(movie.id)} className="BtnDelete">
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>

            <div className="LikesBar">
                <div style={{background: '#bababa', width: likesWidth+'%'}}></div>
                <div style={{background: '#4a4a4a', width: dislikesWidth+'%'}}></div>
            </div>

            <div className="LikesNumber">
                <div ><FontAwesomeIcon icon={faThumbsUp} style={{margin: '0 5px'}}/>{movie.likes}</div>
                <div ><FontAwesomeIcon icon={faThumbsDown} style={{margin: '0 5px -2px 5px'}}/>{movie.dislikes}</div>
            </div>
        </div>
    );
};

export default MovieCard;