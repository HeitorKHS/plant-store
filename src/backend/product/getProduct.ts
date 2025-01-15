'use server'

import ProductRepository from "./ProductRepository";

export default async function getProduct( slug:string ){
    return await ProductRepository.getProduct(slug);
}