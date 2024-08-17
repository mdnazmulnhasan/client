import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Book = ({ book }) => {
    const { image, title, author, description, rating, price, category, publicationDate, publication } = book;

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

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center justify-center">
                {[...Array(fullStars)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-500" />
                ))}
                {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
                {[...Array(emptyStars)].map((_, index) => (
                    <FaRegStar key={index} className="text-yellow-500" />
                ))}
            </div>
        );
    };

    return (
        <div className="rounded overflow-hidden bg-base-100 border m-4 bg-white relative shadow-lg">
            <ToastContainer />
            <img className="w-full h-[250px] object-cover border-[#126456] border-2" src={image} alt={title} />

            <div title='Discount is coming soon' className="absolute top-0 left-0 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded-br-lg transform  shadow-lg">
              {publication} publication
            </div>

            <div className='bg-[#126456] flex justify-between font-work-sense px-4 py-2 text-white'>
                <h1 className='flex items-center gap-2'>  ${price}</h1>
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
                {/* <div className="text-gray-700 text-center mb-2">
                    <span className="text-gray-900 font-semibold">Publication: </span>
                    {publication}
                </div> */}

                <div className="text-center mb-2">
                    <span className="text-gray-900 font-semibold">Published: </span>
                    {new Date(publicationDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </div>

                <div className="text-center mb-2">
                    <span className="text-gray-900 font-semibold">Rating: </span>
                    {renderStars(rating)}
                </div>

                {/* <div className="mt-2 text-center">
                    <span className="text-gray-900 font-semibold">Price: </span>
                    <span className="text-lg text-gray-500">${price}</span>
                </div> */}

                <div className="text-gray-700 text-center mb-4 px-2">
                    <p>{description}</p>
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
    book: PropTypes.object
};

export default Book;
