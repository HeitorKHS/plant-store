//Product
import getNewProduct from "./product/getNewProduct";
import getTopSelling from "./product/getTopSelling";
import getProduct from "./product/getProduct";
import getProducts from "./product/getProducts";
import getSearch from "./product/getSearch";

//User
import createUser from "./user/createUser";
import loginUser from "./user/loginUser";
import getUser from "./user/getUser";
import logoutUser from "./user/logoutUser";

//Favorite
import getFavorite from "./favorite/getFavorite";
import removeProductFavorite from "./favorite/removeProductFavorite";
import inFavorite from "./favorite/inFavorite";
import addProductFavorite from "./favorite/addProductFavorite";

//Cart
import getCart from "./cart/getCart";
import addToCart from "./cart/addToCart";
import removeToCart from "./cart/removeToCart";
import removeProduct from "./cart/removeProduct";
import inCart from "./cart/inCart";
import addProduct from "./cart/addProduct";
import checkout from "./cart/checkout";

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
        getUser,
        logoutUser,
    }

    static readonly favorite = {
        getFavorite,
        removeProductFavorite,
        inFavorite,
        addProductFavorite,
    }

    static readonly cart = {
        getCart,
        addToCart,
        removeToCart,
        removeProduct,
        inCart,
        addProduct,
        checkout,
    }

}