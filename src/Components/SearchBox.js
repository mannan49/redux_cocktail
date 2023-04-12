import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchSearchCocktails } from "../Redux/features/cocktailSlice";

const SearchBox = () => {
  const searchTerm = useRef();
  const dispatch = useDispatch();

  const handleChange = () => {
    const searchText = searchTerm.current.value;
    dispatch(fetchSearchCocktails({ searchText }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center mt-4 mx-0">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              ref={searchTerm}
              onChange={handleChange}
              className="form-control"
              placeholder="Search Here"
              style={{ width: "330px" }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchBox;