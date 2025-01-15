export interface NavigationProps{
    page: number,
    totalPages: number,
    changePage: (newPage: number) => void,
}

export default function Navigation(props: NavigationProps){

    return(

        <div className="flex justify-center gap-5 mt-10">
            <button className={`hover:underline ${props.page > 1 ? '':'invisible'}`} onClick={()=>props.changePage(props.page-1)}>Prev</button>                    
            {
                [0,1,2,3].map((aux)=>{

                    const startPage = Math.max(1, props.page - 1);
                    const endPage = Math.min(startPage + 4 - 1, props.totalPages);
                    const adjustedStartPage = Math.max(1, endPage - 4 + 1);

                    const pages = adjustedStartPage+aux;
                    if (pages > props.totalPages) return null;                                      
                    return (
                        <button
                            key={pages}
                            onClick={() => props.changePage(pages)}
                            className={`p-2 rounded-sm ${pages === props.page ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white transform duration-300'}`}
                        >
                        {pages}
                        </button>
                    );
                })
            }
            <button className={`hover:underline ${props.page < props.totalPages ? '' : 'invisible'}`} onClick={()=>props.changePage(props.page+1)}>Next</button>
        </div>

    )

}