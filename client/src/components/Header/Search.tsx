import React, { useRef } from 'react';
import './search.css';

interface SearchProps {
    placeholder: string;
    onSearch: (word: string) => void;
};

const Search: React.FC<SearchProps> = ({placeholder, onSearch }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputRef.current) {
            onSearch(inputRef.current.value);
        } else {
            console.log('Please enter a word');
            alert('Please enter a word');
        }
    };

    return (
        <form className='form-style' onSubmit={(e) => handleSubmit(e)}>
            <input className='input-style' type="text" ref={inputRef} placeholder={placeholder} data-testid='search-input' />
            <button type="submit" className='button-style'>
                <img src="/images/icon-arrow.svg" alt="submit" />
            </button>
        </form>
    );
};

export default Search;