import { useState, useEffect } from "react";
import usePublicAxios from "../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import Book from "./Book";
import { FaFilter, FaSearch, FaTimes } from "react-icons/fa";
import { ColorRing } from "react-loader-spinner";

const Books = () => {
    const axiosPublic = usePublicAxios();

    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    const [count, setCount] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [publication, setPublication] = useState("");
    const [priceRange, setPriceRange] = useState([0, 3000]);

    const [filters, setFilters] = useState({
      


        category: "",
        publication: "",
        priceRange: [0, 3000],
       
    });

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const { isLoading: countLoading, refetch: countRefetch } = useQuery({
        queryKey: ['totalBooksCount', filters],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/countBooks?search=${search}&category=${filters.category}&minPrice=${filters.priceRange[0]}&maxPrice=${filters.priceRange[1]}&publication=${filters.publication}`);
            setCount(data?.count);
            return data?.count;
        },
        enabled: false,  // This ensures the query is not run automatically
    });

    const handleApplyFilters = () => {
        setFilters({
          
            
            category,
            publication,
            priceRange,
        });
        setIsSidebarOpen(false);
        setCurrentPage(1);
        countRefetch();
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        if (name === "minPrice") {
            setPriceRange([parseFloat(value), priceRange[1]]);
        } else if (name === "maxPrice") {
            setPriceRange([priceRange[0], Math.min(parseFloat(value), 3000)]);
        }
        currentPage(1)
    };

    const searchHandle = (e) => {
        e.preventDefault();
        const searchValue = e.target.search.value;
        setSearch(searchValue);
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
        queryKey: ["books", currentPage, limit, search, sort, filters],
        queryFn: async () => {

            const { data } = await axiosPublic.get(`/books?skip=${skip}&limit=${limit}&search=${search}&sort=${sort}&minPrice=${filters.priceRange[0]}&maxPrice=${filters.priceRange[1]}&publication=${filters.publication}&category=${filters.category}`);
            return data;
        },
        keepPreviousData: true,
    });

    useEffect(() => {
        // Fetch count when filters change
        if (filters) {
            countRefetch();
        }
    }, [filters, countRefetch]);

    useEffect(() => {
        refetch();
    }, [
        
        sort, currentPage, limit, refetch]);

    if (isLoading || countLoading) {
        return  <div className="flex justify-center items-center mt-8 mb-16">

<ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
        </div>;
    }

    return (
        <div className="relative mt-16 flex">
            {/* Sidebar */}
            <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 ${isSidebarOpen ? "block" : "hidden"}`} onClick={toggleSidebar}></div>
            <div className={`fixed top-0 right-0 h-full w-64 bg-gray-100 p-6 shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}>
                <button
                    onClick={toggleSidebar}
                    className="absolute top-2 left-2 text-gray-600 hover:text-gray-900"
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
                        <option value="Novel">Novel</option>
                        <option value="Self-Help">Self-Help</option>
                        <option value="Finance">Finance</option>
                        <option value="Business">Business</option>
                        <option value="Strategy">Strategy</option>
                        <option value="Biography">Biography</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Fantasy">Fantasy</option>
                    </select>
                </div>

                <div className="mb-4">
    <label htmlFor="price-range" className="block font-semibold mb-2">Price Range:</label>
    <div className="flex justify-between">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
    </div>
    <input
        id="price-range"
        type="range"
        min="0"
        max="3000"
        value={priceRange[0]}
        onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
    <input
        type="range"
        min="0"
        max="3000"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
</div>


              

                <button
                    onClick={handleApplyFilters}
                    className="w-full px-4 py-2 bg-[#aa1936] hover:bg-red-700 text-white font-bold rounded-lg shadow-lg focus:outline-none"
                >
                    Apply Filters
                </button>
            </div>

            {/* Main content */}
            <div className={`flex-1 p-6 ${isSidebarOpen ? "overflow-hidden" : "overflow-auto"}`}>
                <div className="flex flex-col md:flex-row justify-around items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex items-center">
                        <label htmlFor="sort-select" className="w-24">Sort By:</label>
                        <select
                            id="sort-select"
                            name="sort"
                            value={sort}
                            onChange={sortHandle}
                            className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                        >
                            <option value="">Default</option>
                            <option value="priceLow">Price Low to High</option>
                            <option value="priceHigh">Price High to Low</option>
                            <option value="newestDate">Newest first</option>
                            <option value="oldestDate">Oldest first</option>
                        </select>
                    </div>

                    <form onSubmit={searchHandle} className="flex items-center border border-gray-300 rounded-lg bg-white">
                    <input
    type="text"
    name="search"
    placeholder="Search Books"
    defaultValue={search}
    className="p-2 border-none outline-none w-full rounded-lg  transition-colors"
/>
                        <button
                            type="submit"
                            className="px-2 py-4 border-none bg-[#aa1936] text-white rounded-r-lg hover:bg-red-700"
                        >
                            <FaSearch />
                        </button>
                    </form>

                    <button
                        onClick={toggleSidebar}
                        className="flex items-center p-2 bg-[#aa1936] hover:bg-red-700 text-white rounded-lg"
                    >
                        <FaFilter className="mr-2" />
                        Filters
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
                    {allBooks.map((book) => (
                        <Book key={book._id} book={book} />
                    ))}
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
        </div>
    );
};

export default Books;
