import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export const fetchCocktails = createAsyncThunk('cocktails/fetchCocktails', async ()=>{
    const res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
    const data = res.json();
    return data;
})
export const fetchSingleCocktail = createAsyncThunk(
    "cocktails/fetchSignleCocktail",
    async ({ id }) => {
      return fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      ).then((res) => res.json());
    }
  );

export const fetchSearchCocktail = createAsyncThunk(
    "cocktails/fetchSearchCocktail",
    async ({ searchText }) => {
      return fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?s=${searchText}`
      ).then((res) => res.json());
    }
  );


const initialState = {
    loading: false,
    cocktails : [],
    error: null,
    // For Single Product Cocktail
    cocktail: [] 
}

const cocktailSlice = createSlice({
    name:"cocktail",
    initialState,
    extraReducers:{
        [fetchCocktails.pending] : (state, action) => {
            state.loading = true
        },
        [fetchCocktails.fulfilled] : (state, action) =>{
            state.loading = false
            state.cocktails = action.payload.drinks
        },
        [fetchCocktails.rejected] : (state, action) =>{
            state.loading = false
            state.error = action.payload
        },
        [fetchSingleCocktail.pending] : (state, action) =>{
            state.loading =  true
        },
        [fetchSingleCocktail.fulfilled] : (state, action) =>{
            state.loading =  false
            state.cocktail = action.payload.drinks
        },
        [fetchSingleCocktail.rejected] : (state, action) =>{
            state.loading =  false
            state.error = action.payload
        },
        [fetchSearchCocktail.pending] : (state, action) =>{
            state.loading =  true
        },
        [fetchSearchCocktail.fulfilled] : (state, action) =>{
            state.loading =  false
            state.cocktails = action.payload.drinks
        },
        [fetchSearchCocktail.rejected] : (state, action) =>{
            state.loading =  false
            state.error = action.payload
        },

    }
})

export default cocktailSlice.reducer;