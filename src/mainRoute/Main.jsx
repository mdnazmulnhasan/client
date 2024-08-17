import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";




const Main = () => {
    return (
        <div>

<div className="  md:w-[94%] max-w-[1400px] mx-auto">
       
       <Navbar/>
<Outlet></Outlet>

        </div>

        <Footer/>
        </div>
    );
};

export default Main;