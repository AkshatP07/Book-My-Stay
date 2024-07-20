import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import HostPage from '../pages/HostPage';
import HostPage2 from '../pages/HostPage2';


const Host = () => {
  let { action } = useParams();

  return (
    <div className="flex flex-col ">
    {action !== 'add' && action !== 'manage' && (
      <div>
    <div className="flex flex-row gap-4  justify-center min-h-screen">
        <Link to='/account/host/add'>
          <button className="w-64 bg-primary text-white py-2 px-4 rounded-full flex items-center justify-center hover:bg-blue-600 mt-4">
            <FaPlus className='mr-2' /> Add Your Stay
          </button>
        </Link>

      {/* 2nd button */}
        <Link to='/account/host/manage'>
          <button className="w-64 bg-primary text-white py-2 px-4 rounded-full flex items-center justify-center hover:bg-green-600 mt-4">
            <IoHome className='mr-2' /> Manage Your Stays
          </button>
        </Link>
      </div>
      </div>
    )}

    {
      action === 'add' && (
        <div>
          <HostPage/>
        </div>
      )
    }
    {
      action === 'manage' && (
        <div>
          <HostPage2/>
        </div>
      )
    }
    </div>
  );
}

export default Host;
