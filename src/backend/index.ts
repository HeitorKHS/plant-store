//Product
import getNewProduct from "./product/getNewProduct";
import getTopSelling from "./product/getTopSelling";
import getProduct from "./product/getProduct";
import getProducts from "./product/getProducts";
//Facade
export default class Backend{
    static readonly product = {
        getNewProduct:getNewProduct,
        getTopSelling:getTopSelling,
        getProduct:getProduct,
        getProducts:getProducts,
    }

}