import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import Spinner from '../components/Spinner';
import { Navigate, useParams, Link } from 'react-router-dom';
import Profile from '../accPages/Profile';
import Host from '../accPages/Host';
import Booking from '../accPages/Booking';
import axios from 'axios';
import { FaUser } from "react-icons/fa";
import { MdCardTravel } from "react-icons/md";
import { TbHomeStats } from "react-icons/tb";

const AccountPage = () => {
  const { user, ready ,setUser } = useContext(UserContext);
  const [redirect,setRedirect] = useState(false);
  
  const handleSignOut = async() => {
    console.log('signout');
     await axios.post('/logout');
     setUser(null);
     setRedirect(true);
  };
  
  if(redirect){
    return <Navigate to="/" />;
  }

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  
  if (!ready) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (ready && !user) {
    return <Navigate to="/login" />;
  }

  // Function to dynamically set link classes based on active subpage
  function LinkClasses(type = null) {
    let classes = 'py-2 px-6 ';
    if (type === subpage) {
      classes += ' bg-primary text-white rounded-full';
    }
    return classes;
  }

 

  return (
    <div className='flex relative bg-bg min-h-screen'>
      {/* Section 1 */}
      <div className='flex flex-col ml-5 p-4 md:w-1/4'>
        
        <nav className='flex flex-col space-y-2'>
          <Link className={LinkClasses('profile')} to={'/account'}><div className='flex gap-x-1'><FaUser className='my-1' /> Personal Information</div></Link>
          <Link className={LinkClasses('bookings')} to={'/account/bookings'}><div className='flex gap-x-2'>
          <MdCardTravel className='my-0' size={22} />My Bookings</div></Link>
          <Link className={LinkClasses('host')} to={'/account/host'}><div className='flex gap-x-2'><TbHomeStats className='my-0' size={22} />Host Your Stay</div></Link>
        </nav>
      </div>

      {/* Section 2 */}
      <div className='flex-1 p-4 ml-4 mr-8'>
        {subpage === 'profile' && (
          <div>
            <Profile />
          </div>
        )}
        {subpage === 'bookings' && (
          <div>
            <Booking />
          </div>
        )}
        {subpage === 'host' && (
          <div>
            <Host />
          </div>
        )}
        <div className='mt-6'>
          <button
            onClick={handleSignOut}
            className='bg-red-500 text-white py-2 px-4 absolute bottom-0 right-12 mb-2 rounded'
          >
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
