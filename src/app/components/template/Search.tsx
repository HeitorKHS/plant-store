import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Search(){

    const [search, setSearch] = useState<string>("")
    const router = useRouter();

    function clickEnter(e: React.KeyboardEvent){
        if(e.key === 'Enter' && search.trim() !== ""){
            router.push(`/search?search=${search}`); 
        }
    }

    function clickSearch(){
        if(search.trim() !== ""){
            router.push(`/search?search=${search}`);
        }
    }

    return(

        <div className="relative">
            <input type="search" placeholder="Search"
                className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-secondary"
                onChange={(e)=>setSearch(e.target.value)}
                onKeyDown={clickEnter}
            />
            <IconSearch  onClick={clickSearch} className="absolute inset-y-0 ml-3 mt-3 cursor-pointer"/>
        </div>

    )

}