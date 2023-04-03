import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../Components/Layout";
import Spinner from "../Components/Spinner";
import { fetchCocktails } from "../Redux/features/cocktailSlice";

const HomePage = () => {
  const [modifiedCocktails, setModifiedCocktails] = useState([]);
  const { loading, cocktails, error } = useSelector((state) => ({
    ...state.app,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCocktails());
  }, []);
  // This useEffect is for updating key names of APIs object
  useEffect(() => {
    if (cocktails) {
      const newCocktails = cocktails.map((item) => {
        const { idDrink, strDrink, strGlass, strAlcoholic, strDrinkThumb } =
          item;
        return {
          id: idDrink,
          name: strDrink,
          glass: strGlass,
          info: strAlcoholic,
          image: strDrinkThumb,
        };
      });
      setModifiedCocktails(newCocktails);
    } else {
      setModifiedCocktails([]);
    }
  }, []);

  // If user a search a cokctail that is not included

  if(!cocktails){
    return(
      <Layout>
        <h1>Sorry, we don't have a cocktail with this name</h1>
      </Layout>
    )
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container text-center">
          <div className="row d-flex justify-content-center">
            <h1>Our CockTail List</h1>
            {modifiedCocktails.map((item) => (
              <div className="card mt-3 ms-3" style={{ width: "18rem" }}>
                <img src={item.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <h5 className="card-title">{item.glass}</h5>
                  <p className="card-text alcoholic mx-auto">{item.info}</p>
                  <Link to={`/product/${item.id}`} className="btn btn-primary">
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
