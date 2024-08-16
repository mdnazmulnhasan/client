import { useState } from "react";
import usePublicAxios from "../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import Book from "./Book";
import { FaFilter, FaSearch, FaTimes } from "react-icons/fa";

const Books = () => {
    const axiosPublic = usePublicAxios();

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    const [count, setCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [publication, setPublication] = useState("");
    const [priceRange, setPriceRange] = useState([0, 3000]);

    const toggleFilter = () => setIsOpen(!isOpen);

    const handleFind = () => {
        console.log("Selected Publication:", publication);
        console.log("Selected Category:", category);
        console.log("Selected Price Range:", priceRange);
        setIsOpen(false); // Close the modal after applying the filter
        refetch()
    
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        if (name === "minPrice") {
            setPriceRange([parseFloat(value), priceRange[1]]);
        } else if (name === "maxPrice") {
            setPriceRange([priceRange[0], Math.min(parseFloat(value), 3000)]);
        }
    };

    const { isLoading: countLoading } = useQuery({
        queryKey: ['totalBooksCount', search, category, priceRange],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/countBooks?search=${search}&category=${category}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`);
            setCount(data?.count);
        }
    });

    const searchHandle = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        setSearch(search);
        setCurrentPage(1);
    };

    const sortHandle = (e) => {
        const selectedSort = e.target.value;
        setSort(selectedSort);
        setCurrentPage(1);
    };

    const totalBooksLength = count;
    const pagesNumber = !countLoading && Math.ceil(totalBooksLength / limit);
    const skip = limit * (currentPage - 1);

    const { data: allBooks = [], isLoading, refetch } = useQuery({
        queryKey: ["books", currentPage, limit, search, category, sort, priceRange,handleFind],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/books?skip=${skip}&limit=${limit}&search=${search}&sort=${sort}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&publication=${publication}`);
            return data;
        },
        keepPreviousData: true,
    });

    if (isLoading || countLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="mt-16">
            <div className="flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex items-center">
                    <label htmlFor="category-select" className="mr-2">Category:</label>
                    <select
                        id="category-select"
                        name="select"
                        value={sort}
                        onChange={sortHandle}
                        className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                    >
                        <option value="">Default</option>
                        <option value="priceLow">Price High to Low</option>
                        <option value="priceHigh">Price Low to High</option>
                        <option value="newestDate">Newest first</option>
                        <option value="oldestDate">Oldest first</option>
                    </select>
                </div>

                <form onSubmit={searchHandle} className="flex items-center border border-gray-300 rounded-lg bg-white">
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

                <div className="relative">
                    <button
                        onClick={toggleFilter}
                        className="flex items-center px-4 py-2 bg-[#aa1936] text-white rounded-lg shadow-md focus:outline-none"
                    >
                        <FaFilter className="mr-2" />
                        Filter
                    </button>

                    {isOpen && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg relative">
                                <button
                                    onClick={toggleFilter}
                                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                                >
                                    <FaTimes size={20} />
                                </button>

                                <h2 className="text-xl font-semibold mb-4">Filter Options</h2>

                                <div className="mb-4">
                                    <label htmlFor="publication-select" className="block font-semibold mb-2">Publication:</label>
                                    <select
                                        id="publication-select"
                                        value={publication}
                                        onChange={(e) => setPublication(e.target.value)}
                                        className="p-2 border border-gray-300 rounded-lg bg-white w-full"
                                    >
                                        <option value="">Select Publication</option>
                                        <option value="Penguin">Penguin</option>
                                        <option value="HarperCollins">HarperCollins</option>
                                        <option value="Vintage">Vintage</option>
                                        <option value="Orion">Orion</option>
                                      
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="category-select" className="block font-semibold mb-2">Category:</label>
                                    <select
                                        id="category-select"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="p-2 border border-gray-300 rounded-lg bg-white w-full"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Category 1">Category 1</option>
                                        <option value="Category 2">Category 2</option>
                                        <option value="Category 3">Category 3</option>
                                        <option value="Category 4">Category 4</option>
                                        <option value="Category 5">Category 5</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="min-price" className="block font-semibold mb-2">Min Price:</label>
                                    <input
                                        id="min-price"
                                        type="number"
                                        name="minPrice"
                                        min="0"
                                        max={priceRange[1]}
                                        value={priceRange[0]}
                                        onChange={handlePriceChange}
                                        className="p-2 border border-gray-300 rounded-lg bg-white w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="max-price" className="block font-semibold mb-2">Max Price:</label>
                                    <input
                                        id="max-price"
                                        type="number"
                                        name="maxPrice"
                                        min={priceRange[0]}
                                        max="3000"
                                        value={priceRange[1]}
                                        onChange={handlePriceChange}
                                        className="p-2 border border-gray-300 rounded-lg bg-white w-full"
                                    />
                                </div>

                                <button
                                    onClick={handleFind}
                                    className="w-full px-4 py-2 bg-[#aa1936] hover:bg-red-700 text-white font-bold rounded-lg shadow-lg focus:outline-none"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid mt-16 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allBooks.length > 0 ? (
                    allBooks.map(book => <Book key={book._id} book={book} />)
                ) : (
                    <p>No books found.</p>
                )}
            </div>

            <div className="join flex justify-center items-center mx-auto mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
                    className="px-4 py-2 bg-[#aa1936] text-white rounded-l-lg"
                >
                    Prev
                </button>
                {Array.from({ length: pagesNumber }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 ${currentPage === index + 1 ? "bg-[#aa1936] text-white" : "bg-white text-[#aa1936]"} border border-[#aa1936]`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    disabled={currentPage === pagesNumber}
                    onClick={() => setCurrentPage((old) => Math.min(old + 1, pagesNumber))}
                    className="px-4 py-2 bg-[#aa1936] text-white rounded-r-lg"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Books;
