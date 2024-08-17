import { FaTrash, FaArrowRight } from 'react-icons/fa';

const MyCart = () => {
    // Sample cart data (Replace this with actual data)
    const cartItems = [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 499, image: '/path/to/image1.jpg' },
        { id: 2, title: '1984', author: 'George Orwell', price: 399, image: '/path/to/image2.jpg' },
        { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 599, image: '/path/to/image3.jpg' },
    ];

    return (
        <div className="container mx-auto p-6 mt-16">
            <h2 className="text-3xl font-bold text-[#aa1936] mb-8 text-center">My Cart</h2>
            <div className="bg-white shadow-lg rounded-lg p-4">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b py-4">
                            <div className="flex items-center space-x-4">
                                <img src={item.image} alt={item.title} className="w-20 h-28 object-cover rounded-lg shadow-md" />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                                    <p className="text-gray-600">by {item.author}</p>
                                    <p className="text-[#aa1936] font-bold mt-2">${item.price}</p>
                                </div>
                            </div>
                            <button className="text-red-600 hover:text-red-800">
                                <FaTrash size={20} />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                )}
                {cartItems.length > 0 && (
                    <div className="mt-8 flex justify-between items-center">
                        <p className="text-xl font-bold">Total: <span className="text-[#aa1936]">${cartItems.reduce((total, item) => total + item.price, 0)}</span></p>
                        <button className="flex items-center px-6 py-3 bg-[#aa1936] hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg">
                            Proceed to Checkout <FaArrowRight className="ml-2" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCart;
