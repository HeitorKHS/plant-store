//Product
import getNewProduct from "./product/getNewProduct";
import getTopSelling from "./product/getTopSelling";
import getProduct from "./product/getProduct";
import getProducts from "./product/getProducts";
import getSearch from "./product/getSearch";

//User
import createUser from "./user/createUser";
import loginUser from "./user/loginUser";

//Facade
export default class Backend{

    static readonly product = {
        getNewProduct:getNewProduct,
        getTopSelling:getTopSelling,
        getProduct:getProduct,
        getProducts:getProducts,
        getSearch:getSearch,
    }

    static readonly user = {
        createUser:createUser,
        loginUser:loginUser,
    }

}