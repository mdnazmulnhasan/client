
import { Link, NavLink } from "react-router-dom";




const Navbar = () => {


const user = false;




// const {user, logOut} = useContext(AuthContext)
// const logoutHandle = ()=>{
//   logOut()
 
// }
  const nav = <>
  
  <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 "><NavLink to={'/'}>Home</NavLink></li>
  <li className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 "><NavLink to={'mycart'}>My Cart</NavLink></li>
 


  <li  className="px-3 sm:hidden py-2 rounded-md text-sm font-medium text-gray-700 ml-3">Log Out</li>
       
    
  </>

    return (
        <div className="navbar bg-base-100 max-w-[1400px] mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        { nav }
      </ul>
    </div>
    <a className="btn font-bold md:text-3xl btn-ghost text-xl ">
  Akhyan<span className="text-[#aa1936]">-আখ্যান</span>
</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
   {nav}
    </ul>
  </div>
  <div className="navbar-end  ">
  {user ?
        <div className="navbar-end">
          <div className='flex items-center gap-4'>
            {/* <img
              alt='User Profile Photo'
              src={user?.photoURL}
              className="rounded-full w-12 h-12"
            /> */}
            <button  className='btn font-raleway bg-[#aa1936] text-white text-center hidden sm:block '>Logout</button>
          </div>
        </div> :  
        <div className="navbar-end">
          <div className='flex items-center gap-4'>
        <Link to={'/login'}>
        <button className='btn font-raleway bg-[#aa1936] text-white block text-center'>  Login </button></Link>
          </div>
        </div>
      }
  </div>
</div>
    );
};

export default Navbar;