import React from 'react';
import { SyncLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className='flex justify-center bg-bg items-center min-h-screen'>
      <SyncLoader color="#1B4965" />
    </div>
  );
};

export default Spinner;
