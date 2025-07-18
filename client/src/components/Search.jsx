import React, { useEffect, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from 'react-icons/fa';
import useMobile from '../hooks/useMobile';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const params = useLocation();
  const searchText = decodeURIComponent(params.search?.split('=')[1] || '');

  useEffect(() => {
    setIsSearchPage(location.pathname === '/search');
  }, [location]);

  const redirectToSearchPage = () => {
    navigate('/search');
  };

  const handleOnChange = (e) => {
  const value = e.target.value;
  const url = `/search?q=${encodeURIComponent(value)}`;
  navigate(url);
};

  return (
    <div className="w-full flex justify-center items-center" style={{ minHeight: '80px' }}>
      <div className={`flex items-center w-full max-w-xl border border-gray-200 bg-gray-50 overflow-hidden${isSearchPage ? ' shadow-md' : ''}`} style={{ borderRadius: '2rem' }}>
        {isMobile && isSearchPage ? (
          <Link
            to="/"
            className="flex justify-center items-center h-full px-4 text-green-700"
          >
            <FaArrowLeft size={20} />
          </Link>
        ) : null}

        <div className="flex-1">
          {isSearchPage ? (
            <input
              type="text"
              autoFocus
              placeholder="Search for items..."
              defaultValue={searchText}
              onChange={handleOnChange}
              className="w-full h-12 px-6 text-lg outline-none bg-transparent text-gray-500"
              style={{ border: 'none', boxShadow: 'none', borderRadius: '2rem' }}
            />
          ) : (
            <div
              onClick={redirectToSearchPage}
              className="w-full h-12 flex items-center px-6 text-gray-400 cursor-pointer text-lg"
            >
              <TypeAnimation
                sequence={[
                  'Search "Rice"',
                  1500,
                  'Search "Honey"',
                  1500,
                  'Search "Tea & Coffee"',
                  1500,
                  'Search "Flour"',
                  1500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          )}
        </div>

        <button className="bg-transparent px-6 h-12 flex items-center justify-center text-gray-400" style={{ borderRadius: '2rem' }}>
          <IoSearch size={24} />
        </button>
      </div>
    </div>
  );
};

export default Search;

