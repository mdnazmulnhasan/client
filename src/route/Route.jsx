import { createBrowserRouter } from "react-router-dom";
import Main from "../mainRoute/Main";
import Home from "../page/Home";

export const router = createBrowserRouter([

    {
        path:'/',
        element:<Main></Main>,
        children:[
        
        {
            path:'/',
            element:<Home></Home>
        },]
    }

])