import React from "react";

const SearchTitle = ({searchTitle, setSearchTitle, onSubmit}) => {
  return (
    <div>
      <input
        placeholder='Search'
        value={searchTitle}
        onChange={e => setSearchTitle(e.target.value)}
        onKeyDown={e => {
          if (!!searchTitle && e.keyCode === 13) {
            onSubmit()
          }
        }}
      />
    </div>
  )
}

export default SearchTitle;