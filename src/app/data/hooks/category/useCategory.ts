import Backend from "@/backend";
import { useEffect, useState } from "react";
import { Product } from "@/core/models/Product";
import { useRouter } from "next/navigation";

export interface useCategoryProps{
    slug: string,
    page: number,
    order: string,
    type: string,
}

export default function useCategory( props: useCategoryProps ){

    const router = useRouter();

    const [products, setProducts] = useState<Product[]|null>(null);
    const [total, setTotal] = useState<number>(0);
    const [filter, setFilter] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(0); 
    const [typesArray, setTypesArray] = useState<{type:string, type_slug: string}[]>([]);

    useEffect(()=>{
        getProducts();
    },[props.slug, props.page, props.order, props.type])

    async function getProducts(){
        const fetchedProducts = await Backend.product.getProducts(props.slug, props.page, props.order, props.type);
        if(fetchedProducts){
            setProducts(fetchedProducts.products);
            setTotal(fetchedProducts.total);
            setTotalPages(fetchedProducts.totalPages);
            setTypesArray(fetchedProducts.types);
        } else {
            setProducts(null);
        }
    }

    return{
        products,
        total,
        totalPages,
        filter,
        typesArray,
        changePage:(page: number)=>{
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('page', String(page));
            router.push(String(currentUrl));
        },
        orderBy:(order: string)=>{
            if(props.type){
                router.push(`/category/${props.slug}?type=${props.type}&order=${order}`); 
            } else{
                router.push(`/category/${props.slug}?order=${order}`); 
            }
        },
        selectType:(type: string)=>{
            if(type === props.type){
                router.push(`/category/${props.slug}`);
            } else{
                router.push(`/category/${props.slug}?type=${type}`);
            }
        },
        openFilter:()=>setFilter(!filter), 
    }

}