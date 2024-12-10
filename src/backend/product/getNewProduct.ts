'use server'

import ProductRepository from "./ProductRepository";

export default async function getNewProduct(){
    return await ProductRepository.getNewProduct();
}