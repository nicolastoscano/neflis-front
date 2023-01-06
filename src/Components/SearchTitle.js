import React from "react";

const SearchTitle = ({searchTitle, setSearchTitle, onSubmit}) => {
  return (
    <div className=" self-center mr-4 ">
      <input className="rounded px-3"
        placeholder='Search a movie'
        value={searchTitle}
        onChange={e => setSearchTitle(e.target.value)}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            onSubmit()
          }
        }}
      />
    </div>
  )
}

export default SearchTitle;