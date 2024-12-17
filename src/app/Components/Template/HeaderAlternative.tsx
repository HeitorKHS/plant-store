import Link from "next/link";
import { IconLockFilled } from "@tabler/icons-react";

export default function HeaderAlternative(){

    return(

        <div className="bg-[#E8E8E4]">
            <div className="container py-5">
                <div className="flex justify-between">
                    <div className="text-primary text-3xl font-bold">
                        <Link href="/">Plants</Link>
                    </div>
                    <div className="flex gap-5 items-center">
                        <span className="text-primary font-semibold">100% Secure</span>
                        <IconLockFilled color="#3a8902"/>
                    </div>
                </div>
            </div>
        </div>

    ) 
}