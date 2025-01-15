import { IconPlus } from "@tabler/icons-react"

export interface BannerItemProps{
    onClick: (index: string) => void,
    dropdown: string,
    title: string,
    text: string,
    index: string
}

export default function BannerItem(props: BannerItemProps){

    return(

        <div className="mt-5">
            <div onClick={()=>props.onClick(props.index)} className="flex items-center justify-between cursor-pointer border-b-2 transform duration-300 hover:border-primary">
                <h1 className="text-2xl font-semibold">{props.title}</h1>
                <IconPlus size={40} className={`transform transition-transform duration-300 ${props.dropdown === props.index ? 'rotate-45' : ''}`}/>
            </div>
            { props.dropdown === props.index && (
                <div className="text-xl text-zinc-600 font-semibold">
                    <p>{props.text}</p>
                </div>
            )}
        </div>

    )

}