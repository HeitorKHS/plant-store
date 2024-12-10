import Backend from "@/backend";
import { useEffect, useState } from "react";
import { Product } from "@/core/models/Product";
import { useRouter } from "next/navigation";

export interface useCategoryProps{
    slug: string,
    page: number,
}

export default function useCategory( props: useCategoryProps ){

    const router = useRouter();

    const [products, setProducts] = useState<Product[]>();
    const [total, setTotal] = useState<number>(0);

    const totalPages = Math.ceil(total / 6);

    useEffect(()=>{
        Backend.product.getProducts(props.slug, props.page).then(Response=>{
            setProducts(Response.products);
            setTotal(Response.total);
        });
    },[props.slug, props.page])

    return{
        products,
        total,
        totalPages,
        changePage:(page: number)=>{
            router.push(`/category/plant?page=${page}`);
        }
    }

}