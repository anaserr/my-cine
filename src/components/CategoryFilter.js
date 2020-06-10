import React from 'react';
import MultiSelect from "react-multi-select-component";
import '../assets/CategoryFilter.css'

const CategoryFilter = ({categries, handleSelect, selectedCategory}) => {

    return (
        <div className="CatBox">
            <h2>Filter by category </h2>
            
            <MultiSelect 
                className="SelectCateg"
                options={categries}
                value={selectedCategory}
                onChange={handleSelect}
                labelledBy={"Select"}
            />
        </div>
    );
};

export default CategoryFilter;