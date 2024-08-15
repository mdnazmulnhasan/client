import { useState } from "react";
import usePublicAxios from "../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import Book from "./Book";
import { FaSearch } from "react-icons/fa";

const Books = () => {



    const axiosPublic = usePublicAxios();

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search,setSearch] = useState("")
    const countLoading = false;


    // search functilnality

    const searchHandle = (e)=>{

        e.preventDefault()
        
        const search = e.target.search.value;
        
        setSearch(search)
            }

// count


    const totalBooksLength = 40; // This should be dynamically fetched or updated based on your API
    const pagesNumber = !countLoading && Math.ceil(totalBooksLength / limit);
    const skip = limit * (currentPage - 1);

    const { data: allBooks = [], isLoading, refetch } = useQuery({
        queryKey: ["books", currentPage, limit],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/books?skip=${skip}&limit=${limit}&search=${search}`);
            return data; // Adjust this based on your actual API response
        },
        keepPreviousData: true, // This helps with pagination and retains previous data
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }


  

    return (
        <div className="mt-16">
<div className="flex justify-center">
<form onSubmit={searchHandle}  className="flex  items-center border border-gray-300 rounded-lg bg-white">
                    <input
                        type="text"
                       
                      name="search"
                        placeholder="Search books..."
                        className="px-4 py-2 md:w-80 rounded-l-lg focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="px-4 py-4 bg-[#aa1936] text-white rounded-r-lg flex items-center justify-center"
                    >
                        <FaSearch />
                    </button>
                </form>
</div>

            <div  className="grid mt-16 sm:grid-cols-2 lg:grid-cols-3 gap-4">


           

                {allBooks.length > 0 ? (
                    allBooks.map(book => <Book key={book._id} book={book} />)
                ) : (
                    <p>No books found.</p>
                )}
            </div>

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
