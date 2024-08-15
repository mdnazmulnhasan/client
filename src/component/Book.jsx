import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Book = ({ book }) => {
    const { image, title, author, price, category,
        publicationDate } = book;

    const handleAddToCart = () => {
        toast.info('This Feature coming soon!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleBuyNow = () => {
        toast.info('Feature coming soon!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div className="rounded overflow-hidden bg-base-100 border m-4 bg-white relative">
            <ToastContainer />
            <img className="w-full h-[250px] object-cover border-[#126456] border-2" src={image} alt={title} />

            <div title='Discount is coming soon' className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded-br-lg transform rotate-12 shadow-lg">
                0% OFF
            </div>

            <div className='bg-[#126456] flex justify-between font-work-sense px-4 py-2 text-white'>
                <h1 className='flex items-center gap-2'>Category</h1>
                <h1 className='flex items-center'>{category}</h1>
            </div>

            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center text-[#aa1936]">
                    {title}
                </div>
                <div className="text-gray-700 text-center mb-2">
                    <span className="text-gray-900 font-semibold">Author: </span>
                    {author}
                </div>

                <div className="text-center mb-2">
                    <span className="text-gray-900 font-semibold">Published: </span>
                    {new Date(publicationDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </div>

                <div className="mt-2 text-center">
                    <span className="text-gray-900 font-semibold">Price: </span>
                    <span className="text-lg text-gray-500">${price}</span>
                </div>
                
                <div className="flex mt-4">
                    <button
                        onClick={handleAddToCart}
                        className="w-1/2 mr-2 bg-[#aa1936] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:ring-opacity-50"
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="w-1/2 ml-2 bg-[#aa1936] hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#aa1936] focus:ring-opacity-50"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
    }).isRequired,
};

export default Book;
