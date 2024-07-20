import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineCloudUpload, MdWifi, MdOutlineLocalParking, MdPets } from "react-icons/md";
import { PiTelevisionSimpleBold, PiSwimmingPoolBold } from "react-icons/pi";
import { TbToolsKitchen } from "react-icons/tb";
import { FaRegTrashAlt, FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { Navigate } from 'react-router-dom';

const HostPage2 = () => {
  const [myStays, setMyStays] = useState([]);
  const [selectedStay, setSelectedStay] = useState(null);
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
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(false);
 

  useEffect(() => {
    const fetchMyStays = async () => {
      try {
        const response = await axios.get('/myStays');
        setMyStays(response.data);
      } catch (e) {
        console.error('Error fetching your place', e);
      }
    };

    fetchMyStays();
  }, []);

  useEffect(() => {
    if (selectedStay) {
      setTitle(selectedStay.title);
      setAddress(selectedStay.address);
      setAddedPhotos(selectedStay.addedPhotos);
      setDescription(selectedStay.description);
      setExtraInfo(selectedStay.extraInfo);
      setCheckInTime(selectedStay.checkInTime);
      setCheckOutTime(selectedStay.checkOutTime);
      setPerks(selectedStay.perks);
      setMaxGuests(selectedStay.maxGuests);
      setPrice(selectedStay.price);

    }
  }, [selectedStay]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/hostUpdate/${selectedStay._id}`, { title, address, addedPhotos, description, perks, extraInfo, checkInTime, checkOutTime, maxGuests,price });
      alert(data.message);
      setRedirect(true);
    } catch (e) {
      console.error('Error updating stay:', e);
    }
  };

  if (redirect) {
    return <Navigate to={'/account/host/manage'} />
  }

  const handlePerksChange = (perk) => {
    setPerks((prevPerks) =>
      prevPerks.includes(perk)
        ? prevPerks.filter((p) => p !== perk)
        : [...prevPerks, perk]
    );
  };

  const addPhotoByLink = async (e) => {
    e.preventDefault();

    try {
      const { data: filename } = await axios.post('/Upload-by-url', {
        link: photoLink
      })
      console.log('download successful:', filename);
      setPhotoLink('');
      setAddedPhotos((prev) => {
        return [...prev, filename];
      });
    }
    catch (e) {
      console.error('Error:', e);
    }
  }

  const removePhoto = (link) => {
    setAddedPhotos((prevPhotos) =>
      prevPhotos.filter((photo) => photo !== link)
    );
  };

  const selectMainPhoto = (link) => {
    const addedPhotosWithoutSelected = addedPhotos.filter((photo) => photo !== link);
    const newAddedPhotos = [link, ...addedPhotosWithoutSelected];
    setAddedPhotos(newAddedPhotos);
  };

  return (
    <div className="p-4">

      <div>
        <h2 className="text-2xl font-bold mb-4">Select a Stay to Modify</h2>
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-3">
        {myStays.length==0 && (
          <div className='text-xl  font-bold mb-2'>
            You didn't host any place yet!!
          </div>
        )}
  {myStays.length > 0 && myStays.map((stay) => (
    <div key={stay._id} onClick={() => setSelectedStay(stay)} className={`cursor-pointer ${selectedStay && selectedStay._id !== stay._id ? 'hidden' : ''}`}>
      <div className="bg-white p-4 shadow-md rounded-md mb-4 flex-grow" style={{ maxWidth: '300px' }}>
        <h2 className="text-xl font-bold mb-2">{stay.title}</h2>
        <p className="text-gray-600 mb-2">{stay.address}</p>
        <img src={`http://localhost:4000/uploads/${stay.addedPhotos[0]}`} alt={stay.title} className="rounded-md w-full h-40 object-cover mb-2" />
        {/* Add other details you want to display when the stay is selected */}
      </div>
    </div>
  ))}
</div>
      </div>

      {selectedStay && (
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

                {addedPhotos.length > 0 && addedPhotos.map((link) => (
                  <div className='relative flex justify-center' key={link}>
                    <img className='rounded cursor-pointer ' src={`http://localhost:4000/uploads/${link}`} alt={link} onClick={() => window.open(`http://localhost:4000/uploads/${link}`)} />
                    <button type="button" className='absolute bottom-2 rounded-s right-1 bg-black bg-opacity-50 p-1 text-white' onClick={() => { removePhoto(link) }}>
                      <FaRegTrashAlt />
                    </button>
                    <button type="button" className='absolute bottom-2 left-1 rounded-s bg-black bg-opacity-50 p-1 text-yell' onClick={() => { selectMainPhoto(link) }}>
                      {link === addedPhotos[0] && (<div>
                        <FaStar />
                      </div>)}
                      {link !== addedPhotos[0] && (<div>
                        <CiStar />
                      </div>)}
                    </button>
                  </div>
                ))}
                <div className="flex items-center  gap-x-2 mb-2">
                  <label
                    type="button"
                    onClick={() => {
                      // Handle uploading functionality here
                      console.log("Uploading photos...");
                    }}
                    className="p-6 bg-transparent cursor-pointer shadow-md text-text text-xl rounded flex items-center"
                  >
                    <MdOutlineCloudUpload className="mr-2" size={25} />
                    <input type="file" className='hidden' />
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
                <MdWifi size={25} />
                <span className='text-bold'>Wifi</span>
              </label>
              <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
                <input
                  type='checkbox'
                  onChange={() => handlePerksChange('Free Parking')}
                  checked={perks.includes('Free Parking')}
                />
                <MdOutlineLocalParking size={25} />
                <span className='text-bold'>Free Parking</span>
              </label>
              <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
                <input
                  type='checkbox'
                  onChange={() => handlePerksChange('TV')}
                  checked={perks.includes('TV')}
                />
                <PiTelevisionSimpleBold size={25} />
                <span className='text-bold'>TV</span>
              </label>
              <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
                <input
                  type='checkbox'
                  onChange={() => handlePerksChange('Kitchen')}
                  checked={perks.includes('Kitchen')}
                />
                <TbToolsKitchen size={25} />
                <span className='text-bold'>Kitchen</span>
              </label>
              <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
                <input
                  type='checkbox'
                  onChange={() => handlePerksChange('Swimming Pool')}
                  checked={perks.includes('Swimming Pool')}
                />
                <PiSwimmingPoolBold size={25} />
                <span className='text-bold'>Swimming Pool</span>
              </label>
              <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
                <input
                  type='checkbox'
                  onChange={() => handlePerksChange('Pets')}
                  checked={perks.includes('Pets')}
                />
                <MdPets size={25} />
                <span className='text-bold'>Pets</span>
              </label>
            </div>
          </div>

          <div>
            <h2 className="text-2xl mt-4 font-bold">Extra Info</h2>
            <p className="text-sm text-gray-500">House rules, etc.</p>
            <textarea
              className="w-full h-32 p-2 border border-gray-300 rounded"
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            ></textarea>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 mt-2">
            <div>
              <h3 className="mt-2 -mb-1">Check-in time</h3>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                placeholder="14:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check-out time</h3>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                placeholder="11:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guests</h3>
              <input
                type="number"
                className="w-full border rounded p-2"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price Per Night</h3>
              <input
                type="number"
                className="w-full border rounded p-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button type="submit" className="primary mt-4 mb-4 max-w-sm p-2">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default HostPage2;
