import React, { useState } from 'react';
import { MdOutlineCloudUpload, MdWifi, MdOutlineLocalParking, MdPets } from "react-icons/md";
import { PiTelevisionSimpleBold, PiSwimmingPoolBold } from "react-icons/pi";
import { TbToolsKitchen } from "react-icons/tb";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const HostPage = () => {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [description, setDescription] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [perks, setPerks] = useState([]);
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect,setRedirect] = useState(false);
  const [price,setPrice] = useState(0);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const {data} = await axios.post('/hostAdd',{title, address, addedPhotos, description, perks,extraInfo, checkInTime ,checkOutTime ,maxGuests,price});
    alert(data.message);
    console.log(data.message);
    setRedirect(true);
  };

if(redirect){
  return <Navigate to={'/account/host'}/>
}

  const handlePerksChange = (perk) => {
    setPerks((prevPerks) =>
      prevPerks.includes(perk)
        ? prevPerks.filter((p) => p !== perk)
        : [...prevPerks, perk]
    );
  };

  const addPhotoByLink = async(e) => {
    e.preventDefault();
    
    try {
      const {data:filename} = await axios.post('/Upload-by-url', {
          link:photoLink}   
      )
      console.log('download successful:', filename);
      setPhotoLink('');
      setAddedPhotos((prev) => {
        return [...prev, filename];
      });
    }
      catch(e){
        console.error('Error:', e);
      }
    }
    
    const removePhoto = (link) => {
      setAddedPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => photo !== link)
      );
    };

    const selectMainPhoto = (link) => {
      const addedPhotosWithoutSelected = addedPhotos.filter((photo) => photo!==link);
      const newAddedPhotos = [link,...addedPhotosWithoutSelected];
      setAddedPhotos(newAddedPhotos);
    };
    
    
 
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Host Your Stay</h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Title</h2>
            <p className="text-sm text-gray-500">Advice for the host to add a catchy title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter title"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Address</h2>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter address"
            />
          </div>
        </div>

        <div className="mt-4 gap-x-6">
        <div className="mt-4 gap-x-6 flex">
        
          <h2 className="text-2xl mt-6 font-bold">Photos</h2>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          
          {addedPhotos.length>0 && addedPhotos.map((link) =>(
            <div className='relative flex justify-center'>
              <img className='rounded cursor-pointer ' src={`http://localhost:4000/uploads/${link}`} alt={link} onClick={() => window.open(`http://localhost:4000/uploads/${link}`)}/>
              <button type="button" className='absolute bottom-2 rounded-s right-1 bg-black bg-opacity-50 p-1 text-white' onClick={() =>{removePhoto(link)}}>
              <FaRegTrashAlt />
              </button>
              <button type="button" className='absolute bottom-2 left-1 rounded-s bg-black bg-opacity-50 p-1 text-yell' onClick={() =>{selectMainPhoto(link)}}>
             {link===addedPhotos[0] && (<div>
              <FaStar />
             </div>)}
             {link!==addedPhotos[0] && (<div>
              <CiStar />
             </div>)}
              </button>
            </div>
          ))}
          <div className="flex items-center  gap-x-2 mb-2">
          <label
              type="button"
              onClick={() => {
                
                console.log("Uploading photos...");
              }}
              className="p-6 bg-transparent cursor-pointer shadow-md text-text text-xl rounded flex items-center"
            >
              <MdOutlineCloudUpload className="mr-2" size={25} />
              <input type="file" className='hidden'/>
               Upload
            </label>
          </div>
            
            </div>
          </div>
          <div className='flex gap-x-2'>
          <input
              type="text"
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter photo URL"
            />
             <button
              type="button"
              onClick={addPhotoByLink}
              className="p-1 bg-primary text-white rounded"
            >
              Add Photo
            </button>
          </div>
          
        </div>

        <div>
          <h2 className="text-2xl mt-4 font-bold">Description</h2>
          <p className="text-sm text-gray-500">Tell more about the place</p>
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <h2 className="text-2xl mt-4 font-bold">Perks</h2>
          <p className="text-sm text-gray-500">Select all the perks of the place</p>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2'>
            <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
              <input
                type='checkbox'
                onChange={() => handlePerksChange('Wifi')}
                checked={perks.includes('Wifi')}
              />
              <MdWifi size={25}/>
              <span className='text-bold'>Wifi</span>
            </label>
            <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
              <input
                type='checkbox'
                onChange={() => handlePerksChange('Free Parking')}
                checked={perks.includes('Free Parking')}
              />
              <MdOutlineLocalParking />
              <span className='text-bold'>Free Parking</span>
            </label>
            <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
              <input
                type='checkbox'
                onChange={() => handlePerksChange('Kitchen')}
                checked={perks.includes('Kitchen')}
              />
              <TbToolsKitchen />
              <span className='text-bold'>Kitchen</span>
            </label>
            <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
              <input
                type='checkbox'
                onChange={() => handlePerksChange('TV')}
                checked={perks.includes('TV')}
              />
              <PiTelevisionSimpleBold />
              <span className='text-bold'>TV</span>
            </label>
            <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
              <input
                type='checkbox'
                onChange={() => handlePerksChange('Swimming Pool')}
                checked={perks.includes('Swimming Pool')}
              />
              <PiSwimmingPoolBold />
              <span className='text-bold'>Swimming Pool</span>
            </label>
            <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
              <input
                type='checkbox'
                onChange={() => handlePerksChange('Pets Allowed')}
                checked={perks.includes('Pets Allowed')}
              />
              <MdPets />
              <span className='text-bold'>Pets Allowed</span>
            </label>
          </div>
        </div>

        <div>
          <h2 className="text-2xl mt-4 font-bold">Extra Info</h2>
          <p className="text-sm text-gray-500">You can add something more house rules etc.</p>
          <textarea
            className='w-full h-32 p-2 border border-gray-300 rounded'
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-2xl mt-4 font-bold">Check-In & Out times</h2>
          <p className="text-sm text-gray-500">Specify the check-in and check-out times, remember to have some time window between guests for cleaning.</p>
          <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-4'>
            <div>
              <h3 className="text-xl mt-4 font-bold">Check-In time</h3>
              <input
                type='text'
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                placeholder='14:00'
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <h3 className="text-xl mt-4 font-bold">Check-Out time</h3>
              <input
                type='text'
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                placeholder='11:00'
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <h3 className="text-xl mt-4 font-bold">Max Guests</h3>
              <input
                type='text'
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <h3 className="text-xl mt-4 font-bold">Price Per Night</h3>
              <input
                type='text'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
       
        <div className="mt-4">
          <button
            type="submit"
            className="p-2 bg-primary text-white rounded w-full"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default HostPage;
