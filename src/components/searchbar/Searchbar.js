import { useState } from 'react';
import { toast } from "react-toastify";
import { FaSearch } from 'react-icons/fa';
import PropTypes from "prop-types";

import s from './Searchbar.module.css'

function Searchbar ({onSubmit}) {

    const [requestTerm, setRequestTerm] = useState('');


    const handleInputChange = (event) => {
        setRequestTerm(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (requestTerm.trim() === '') {
          toast.error('Sorry, that search term has no results. Please try an alternate search term.');
        return;
    }

        onSubmit(requestTerm);
        reset();
    };

    const reset = () => {
        setRequestTerm('');
    };

        return (
            <header className={s.searchbar}>
                <h1>Image-finder</h1>
                <div className={s.searchFormWrap}>
                <form className={s.searchForm} onSubmit = {handleSubmit}>
                    <input
                      className={s.searchFormInput}
                      type="text"
                      autoComplete="off"
                      autoFocus
                      placeholder="Search images and photos"
                      value={requestTerm}
                      onChange = {handleInputChange}                 
                     />
                        
                    <button type="submit" className={s.searchFormButton}>
                            <FaSearch
                                style={{ marginRight: 8 }}
                                color="rgb(90, 64, 90)"
                                size="30px"
                                aria-label="Search images" />
                    </button>
                    </form>
                    </div>
            </header>
        )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;