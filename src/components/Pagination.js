import React from 'react';
import {faAngleDoubleLeft, faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/Pagination.css'

const Pagination = ({nbrResult, selectNbr, paginationHandler }) => {
    return (
        <div className="PageContainer" >
            <button className="NavBtn" name="previous" onClick={paginationHandler}>
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </button>
            <div style={{margin: 'auto'}}>
                <span>Movies per page : </span>
                <button className={nbrResult === 4 ? "SelectedNbr" : 'PagBtn'} onClick={selectNbr} id="4">4</button>
                <button className={nbrResult === 8 ? "SelectedNbr" : 'PagBtn'} onClick={selectNbr} id="8">8</button>
                <button className={nbrResult === 12 ? "SelectedNbr" : 'PagBtn'} onClick={selectNbr} id="12">12</button>
            </div>
            <button className="NavBtn" name="next" onClick={paginationHandler}>
                <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
        </div>
    );
};

export default Pagination;