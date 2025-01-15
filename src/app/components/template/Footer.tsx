import Link from "next/link";
import { IconMapPinFilled, IconPhoneFilled, IconBrandWhatsappFilled, IconMailFilled, IconBrandInstagram, IconBrandFacebook, IconBrandYoutube} from "@tabler/icons-react";

export default function Footer(){

    return(

        <div className="mt-20 bg-[#E8E8E4]">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 justify-items-center py-10 gap-10">

                {/*Support*/}
                <div className="space-y-5">
                    <h1 className="text-xl font-bold">Support</h1>
                    <div className="flex flex-col gap-3 text-zinc-600">
                        <Link href="/">Contact Us</Link>
                        <Link href="/">Help Center</Link>
                        <Link href="/">Support Tickets</Link>
                    </div>
                </div>

                {/*Institutional*/}
                <div className="space-y-5">
                    <h1 className="text-xl font-bold">Institutional</h1>
                    <div className="flex flex-col gap-3 text-zinc-600">
                        <Link href="/">About Plants</Link>
                        <Link href="/">Affiliate Program</Link>
                        <Link href="/">International Orders</Link>
                        <Link href="/">Blog</Link>
                    </div>
                </div>

                {/*Contact*/}
                <div className="space-y-5">
                    <h1 className="text-xl font-bold">Contact Us</h1>
                    <div className="flex flex-col gap-3 text-zinc-600">
                        <Link className="flex gap-1" href="/"><IconMapPinFilled/>Put your address here</Link>               
                        <Link className="flex gap-1" href="/"><IconPhoneFilled/>(99) 9999-9999</Link>
                        <Link className="flex gap-1" href="/"><IconBrandWhatsappFilled/>(99) 9999-9999</Link>
                        <Link className="flex gap-1" href="/"><IconMailFilled/>email@email.email</Link>
                    </div>
                </div>

                {/*Social Media*/}
                <div className="space-y-5">
                    <h1 className="text-xl font-bold">Social Media</h1>
                    <div className="flex gap-3 text-zinc-600">
                        <Link className="flex gap-1" href="/"><IconBrandInstagram size={35}/></Link>               
                        <Link className="flex gap-1" href="/"><IconBrandFacebook size={35}/></Link>
                        <Link className="flex gap-1" href="/"><IconBrandYoutube size={35}/></Link>
                    </div>
                </div>

            </div>
        </div>

    )

}