'use client'

import Layout from "./components/template/Layout";
import InfoCard from "./components/home/InfoCard";
import Collection from "./components/home/Collection";
import ListProduct from "./components/product/ListProduct";
import BannerItem from "./components/home/BannerItem";

import Image from "next/image";
import { IconPackage, IconTimeDuration30, IconPlant2, IconShieldHalfFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import collections from "./data/constants/collections";
import care from "./data/constants/care";

import { Product } from "@/core/models/Product";
import Backend from "@/backend";

export default function Page(){

  const [bestProducts, setBestProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [dropdown,setDropdown] = useState<string>("");

  const openDropdown = (index: string) => {
    setDropdown(dropdown === index ? "" : index);
  };


  useEffect(()=>{
    Backend.product.getTopSelling().then(setBestProducts);
    Backend.product.getNewProduct().then(setNewProducts);
  },[])

  return(
    
    <Layout>
      <div>

        {/*Hero*/}
        <div className="container mt-10">
          <Image className="hidden md:block rounded-lg" src="/assets/big-hero.png" alt="big-hero" layout="responsive" width={1920} height={650}/>
          <Image className="block md:hidden rounded-lg" src="/assets/small-hero.png" alt="small-hero" layout="responsive" width={950} height={1200}/>
        </div>

        {/*Info*/}
        <div className="container mt-20">
          <div className="grid md:grid-cols-4 md:justify-items-center gap-5">
            <InfoCard icon={IconPackage} text="Free shipping nationwide"/>
            <InfoCard icon={IconTimeDuration30} text="30 days to return"/>
            <InfoCard icon={IconPlant2} text="100% natural"/>
            <InfoCard icon={IconShieldHalfFilled} text="Secure payment"/>  
          </div>
        </div>

        {/*Collections*/}
        <div className="container mt-20">
          <Collection title="Collections" collections={collections} />
        </div>

        {/*Top Salling*/}
        <div className="container mt-20">
          <ListProduct title="Top Selling" products={bestProducts}/>
        </div>

        {/*Banner*/}
        <div className="container mt-20">
          <h1 className="text-secondary text-3xl font-bold text-center">WHY CHOOSE US</h1>
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            <div>
              <Image className="rounded-lg" src="/assets/seedling.jpg" alt="seedling" layout="responsive" width={1920} height={1280}/>
            </div>
            <div>
              <BannerItem onClick={openDropdown} dropdown={dropdown} title="Variety of Plants" text="Here you will find a variety of plants, such as fruit trees, vegetables, orchids, bonsai, etc." index="variety"/>
              <BannerItem onClick={openDropdown} dropdown={dropdown} title="Sustainability" text="We use sustainable practices, such as ecological packaging and organic farming." index="sustainability"/>
              <BannerItem onClick={openDropdown} dropdown={dropdown} title="Quality" text="High quality plants, we cultivate from germination, using organic products." index="quality"/>
              <BannerItem onClick={openDropdown} dropdown={dropdown} title="Competitive Prices" text="We offer affordable prices without compromising on quality." index="price"/>
            </div>
          </div>
        </div>

        {/*New Product*/}
        <div className="container mt-20">
          <ListProduct title="New Products" products={newProducts}/>
        </div>

        {/*New Product*/}
        <div className="container mt-20">
          <ListProduct title="New Products" products={newProducts}/>
        </div>

        {/*Notification **modify later */}
        <div className="container mt-20">
          <div className="flex flex-col items-center gap-5 text-white rounded-xl bg-primary/60 p-5">
            <h1 className="text-xl font-bold text-center">Receive notifications with our latest offers</h1>
            <div className="flex flex-col md:flex-row gap-5">
              <input className="rounded-sm p-2 text-black" type="email" placeholder="example@example.com"/>
              <button className="p-2 bg-primary rounded-xl">Subscribe</button>
            </div>
          </div>
        </div>

        {/*Plant care tips **modify later */}
        <div className="container mt-20">
          <div className="grid md:grid-cols-2 bg-[#ECECEC] rounded-xl">
            <div>
              <Image className="rounded-xl max-h-[300px] max-w-[400px]" src="/assets/bg.png" alt="Background Plant" layout="responsive" width={400} height={300} />
            </div>
            <div className="p-10 space-y-5">
              <h1 className="text-2xl font-bold text-primary text-center md:text-left">Plant Care Tips</h1>
              <div className="space-y-1 text-zinc-700">
                {care.map((text, index) => (
                  <p key={index}>- {text}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </Layout>

  )

}
