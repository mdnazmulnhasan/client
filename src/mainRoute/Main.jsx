import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";




const Main = () => {
    return (
        <div className="max-w-[1400px] mx-auto">
       
       <Navbar/>
<Outlet></Outlet>

        </div>
    );
};

export default Main;