import React from 'react';

const Search = () => {
  return (
<div className="inline-flex flex-col sm:flex-row rounded-md shadow-sm mt-[5%] w-full">

  <input 
    aria-current="page" 
    className="px-4 py-2 text-sm
         font-medium text-blue-700
        bg-white 
        border-r " 
              placeholder='Job Search'
  />
  
  <input 
    className="px-4 py-2 text-sm font-medium
     text-gray-900 
     border-gray-200
     " 
           placeholder='Location'
  />
  
  <button
    className="px-4 py-2 text-sm font-medium
     text-white
      rounded-md
       dark:bg-blue-700
          " 
  >Search</button>
</div>
  )

};

export default Search;
