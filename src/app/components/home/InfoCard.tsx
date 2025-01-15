import { ElementType } from "react";

export interface InfoCardProps{
    text: string,
    icon: ElementType,
}

export default function InfoCard(props: InfoCardProps){

    return(

        <div className="flex items-center gap-5 text-primary ">
            <div className="border-2 border-primary rounded-full p-3">
                <props.icon/>
            </div>
            <span className="font-bold">{props.text}</span>
        </div>

    )

}