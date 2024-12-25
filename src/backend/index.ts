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

}