//Product
import getNewProduct from "./product/getNewProduct";
import getTopSelling from "./product/getTopSelling";
import getProduct from "./product/getProduct";
import getProducts from "./product/getProducts";
import getSearch from "./product/getSearch";

//User
import createUser from "./user/createUser";
import loginUser from "./user/loginUser";
import logoutUser from "./user/logoutUser";
import getUser from "./user/getUser";

//Cart
import inCart from "./cart/inCart";
import removeProductToCart from "./cart/removeProductToCart";
import addProductToCart from "./cart/addProductToCart";
import getCart from "./cart/getCart";
import addQuantity from "./cart/addQuantity";
import removeQuantity from "./cart/removeQuantity";
import checkout from "./cart/checkout";

//Favorite
import inFavorite from "./favorite/inFavorite";
import removeProductToFavorite from "./favorite/removeProductToFavorite";
import addProductToFavorite from "./favorite/addProductToFavorite";
import getFavorite from "./favorite/getFavorite";

//Facade
export default class Backend{

    static readonly product = {
        getNewProduct,
        getTopSelling,
        getProduct,
        getProducts,
        getSearch,
    }

    static readonly user = {
        createUser,
        loginUser,
        logoutUser,
        getUser,
    }

    static readonly cart = {
        inCart,
        removeProductToCart,
        addProductToCart,
        getCart,        
        addQuantity,
        removeQuantity,
        checkout,
    }

    static readonly favorite = {
        inFavorite,
        removeProductToFavorite,
        addProductToFavorite,
        getFavorite,
    }

}