'use client'

import HeaderAlternative from "./HeaderAlternative";
import Footer from "./Footer";

export default function LayoutAlternative({children}:any){

    return (
        <div className="flex flex-col min-h-screen">
            <HeaderAlternative/>
                <main className="flex-grow">{children}</main>
            <Footer/>
        </div>
    )
    
}