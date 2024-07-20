import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className='max-w-2xl mx-auto p-4  '>
      <h2 className='text-2xl font-bold mb-4'>Personal Information</h2>
      <div className='grid grid-cols-2 gap-4'>
        <div className='p-4 border border-gray-300 rounded-lg bg-white shadow-sm'>
          <div className='font-semibold text-gray-700'>Name</div>
          <div className='text-gray-900'>{user.user.name}</div>
        </div>
        <div className='p-4 border border-gray-300 rounded-lg bg-white shadow-sm'>
          <div className='font-semibold text-gray-700'>Date of Birth</div>
          <div className='text-gray-900'>{user.user.dateOfBirth || 'N/A'}</div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4 mt-4'>
        <div className='p-4 border border-gray-300 rounded-lg bg-white shadow-sm'>
          <div className='font-semibold text-gray-700'>Country/Region</div>
          <div className='text-gray-900'>{user.user.country || 'India'}</div>
        </div>
        <div className='p-4 border border-gray-300 rounded-lg bg-white shadow-sm'>
          <div className='font-semibold text-gray-700'>Language</div>
          <div className='text-gray-900'>{user.user.language || 'N/A'}</div>
        </div>
      </div>
      <div className='mt-4 p-4 border border-gray-300 rounded-lg bg-white shadow-sm'>
        <div className='font-semibold text-gray-700'>Contact Number</div>
        <div className='text-gray-900'>{user.user.contactNumber || 'N/A'}</div>
      </div>
      <div className='mt-6'>
        {/* Additional content if needed */}
      </div>
    </div>
  );
};

export default Profile;
