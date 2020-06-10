import React, { useState } from 'react';
import { faThumbsUp,faThumbsDown, faHeart as faHeartFull, faTrashAlt, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <div style={{background: 'linear-gradient(46deg, rgb(0, 0, 0), rgba(30, 30, 17, 0.8))',color:'#fff', border: '1px solid black',minWidth: '195px', height: '250px', margin: '5px 0', position: 'relative'}}>
            <button onClick={handleFavorits} style={{position: 'absolute', top: '2px', right: '2px',border: '0',outline: 'none', fontSize: '25px',background: 'none', color: '#eed522'}}>
                <FontAwesomeIcon icon={liked === null ? faHeart : (liked===true) ? faHeartFull  : faHeartBroken} />
            </button>
            <div style={{position: 'absolute', top: '20px', left: '5px', textAlign: 'left'}}>
                <div style={{color: '#fff', fontSize: '34px', marginBottom: '5px', fontWeight: 'bold', wordBreak: 'break-word'}}>{movie.title}</div>
                <div style={{color: '#eed522',fontSize: '15px', fontStyle: 'italic'}}>{movie.category}</div>
            </div>
            
            <button onClick={(e)=>handleDelete(e,movie.id)} id={movie.id} style={{position: 'absolute', bottom: '35px', left: '0px',border: '0',outline: 'none', fontSize: '16px',background: 'none', color: '#fff'}}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>

            <div style={{position: 'absolute', bottom: '3px', left: '0px', textAlign: 'left', width: '100%',height: '5px', display: 'flex', color: '#fff'}}>
                <div style={{background: '#bababa', width: likesWidth+'%'}}></div>
                <div style={{background: '#4a4a4a', width: dislikesWidth+'%'}}></div>
            </div>

            <div style={{position: 'absolute', bottom: '10px', left: '0px',width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                <div style={{display: 'flow-root', color: '#bababa'}}><FontAwesomeIcon icon={faThumbsUp} style={{margin: '0 5px'}}/>{movie.likes}</div>
                <div style={{display: 'flow-root', color: '#bababa'}}><FontAwesomeIcon icon={faThumbsDown} style={{margin: '0 5px -2px 5px'}}/>{movie.dislikes}</div>
            </div>
        </div>
    );
};

export default MovieCard;