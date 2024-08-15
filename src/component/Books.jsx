import { useState } from "react";


const Books = () => {


    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(9);
    const countLoading = false;
   
const totalBooksLength  = 40;

    const pagesNumber = !countLoading && Math.ceil(totalBooksLength / limit);
    const skip = limit * (currentPage - 1);

    return (
        <div>
            <div className="join flex justify-center items-center mx-auto mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="join-item btn btn-outline"
                >
                    Previous page
                </button>

                {Array.from({ length: pagesNumber }, (_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}
                        className={idx + 1 === currentPage ? "join-item btn bg-[#aa1936] hover:bg-[#aa1936] text-white" : "join-item btn hover:bg-[#aa1936] hover:text-white"}
                    >
                        {idx + 1}
                    </button>
                ))}

                <button
                    disabled={currentPage === pagesNumber}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="join-item btn btn-outline"
                >
                    Next
                </button>
            </div> 
        </div>
    );
};

export default Books;