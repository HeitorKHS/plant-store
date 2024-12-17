'use client'

import HeaderAlternative from "./HeaderAlternative";
import Footer from "./Footer";

export interface LayoutAlternativeProps{
    children: any
}

export default function LayoutAlternative(props: LayoutAlternativeProps){
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderAlternative/>
                <main className="flex-grow">{props.children}</main>
            <Footer/>
        </div>
    )
}