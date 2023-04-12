import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { fetchSingleCocktails } from "../Redux/features/cocktailSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SpinnerAnim from "../Components/shared/SpinnerAnim";
const ProductDetails = () => {
  const [modifiedCocktail, setModifiedCocktail] = useState([]);

  const { loading, cocktail } = useSelector((state) => ({ ...state.app }));
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleCocktails({ id }));
  }, [dispatch, id]);
  useEffect(() => {
    if (cocktail.length > 0) {
      const {
        strDrink: name,
        strCategory: category,
        strAlcoholic: info,
        strGlass: glass,
        strDrinkThumb: img,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
      } = cocktail[0];
      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
      ];
      const newCocktail = {name, category, info, glass, img, ingredients};
      setModifiedCocktail(newCocktail);
    } else {
      setModifiedCocktail(null);
    }
  }, [id, cocktail]);

  if (!modifiedCocktail) {
    return <h2>No Cocktail Details</h2>;
  } else {
    const { name, category, info, glass, img, ingredients } = modifiedCocktail;
    return (
      <>
        <Layout>
          {loading ? (
            <SpinnerAnim />
          ) : (
            <div className="container mt-4">
              <Link to="/" className="go-back">
                Go Back
              </Link>
              <div className="row text-center">
                <div className="col-md-5">
                  <img className="img-fluid w-50 mt-5" src={img} alt={name} />
                </div>
                <div className="col-md-5">
                  <h3> Name: {name} </h3>
                  <p className="description"> Category: {category} </p>
                  <p className="description"> Info: {info} </p>
                  <p className="description">Glass: {glass} </p>
                  <p className="description">Ingredients: {ingredients + ","}</p>
                </div>
              </div>
            </div>
          )}
        </Layout>
      </>
    );
  }
};

export default ProductDetails;