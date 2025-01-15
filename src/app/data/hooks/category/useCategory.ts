import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Product } from "@/core/models/Product";
import Backend from "@/backend";

export interface useCategoryProps{
    slug: string,
    page: number,
    order: string,
    type: string,
}

export interface types{
    type:string, 
    type_slug: string
}

export default function useCategory( props : useCategoryProps ){

    const router = useRouter();

    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [filter, setFilter] = useState<boolean>(false);
    const [typesArray, setTypesArray] = useState<types[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        getProducts();
    },[props.slug, props.page, props.order, props.type])

    async function getProducts(){
        setLoading(true);
        await Backend.product.getProducts(props.slug, props.page, props.order, props.type).then((data)=>{
            setProducts(data?.products || []);
            setTotal(data?.total || 0);
            setTotalPages(data?.totalPages || 0);
            setTypesArray(data?.types || []);
        });
        setLoading(false);
    }

    return{
        products,
        loading,
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
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('order', order);
            router.push(String(currentUrl));
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