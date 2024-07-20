import React, { useEffect,useState } from 'react';
// import  { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import { UserContext } from '../UserContext';
import Spinner from '../components/Spinner';
import { MdWifi, MdOutlineLocalParking, MdPets } from 'react-icons/md';
import { TbToolsKitchen } from 'react-icons/tb';
import { PiTelevisionSimpleBold, PiSwimmingPoolBold } from 'react-icons/pi';
import { CiLocationOn } from "react-icons/ci";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { differenceInCalendarDays } from 'date-fns';


const PlacePage = () => {
  const {id} = useParams();
  const [currPlace, setCurrentPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // const { user } = useContext(UserContext);
  const[checkIn,setCheckIn] = useState('');
  const[checkOut,setCheckOut] = useState('');
  const[guestCount,setGuestCount] = useState(1);
  const[name,setName] = useState('');
  const[mobile,setMobile] = useState('');
  const[bookingId,setBookingId] = useState([]);
  // const [client, setClient] = useState(null);

//   useEffect(() => {
//     if (user && user.user) {
//       setClient(user.user.id);
//     }
//   }, [user]);

// console.log(client)


  let numberOfNights = 0;
  if(checkIn&&checkOut){
    numberOfNights=differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
  }

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get('/places');
        const allPlaces = response.data;
        const selectedPlace = allPlaces.find((p) => p._id === id);
        setCurrentPlace(selectedPlace);
      } catch (e) {
        console.error('Error fetching places', e);
      }
    };
    fetchPlace();
  }, [id]);

  if (!currPlace) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const toggleShowAllPhotos = () => setShowAllPhotos(!showAllPhotos);
  const toggleShowMoreDescription = () => setShowMoreDescription(!showMoreDescription);

  if (showAllPhotos) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-90 flex flex-wrap justify-center items-center p-4'>
        {currPlace?.addedPhotos?.length > 0 &&
          currPlace.addedPhotos.map((photo, index) => (
            <a
              key={index}
              href={`http://localhost:4000/uploads/${photo}`}
              target="_blank"
              rel="noopener noreferrer"
              className='p-2'
            >
              <img
                src={`http://localhost:4000/uploads/${photo}`}
                alt={`Photo ${index}`}
                className='rounded-md h-64 object-cover'
              />
            </a>
          ))}
        <button
          onClick={toggleShowAllPhotos}
          className='absolute top-2 right-2 p-2 bg-primary text-white rounded-lg'
        >
          Close
        </button>
      </div>
    );
  }
  

  const booking = async() =>{
try{
const response = await axios.post('/booking',{
    currPlace,checkIn,checkOut,guestCount,numberOfNights,name,mobile
})
alert(response.data.message)
setBookingId(response.data.data._id);
setRedirect(true);
}
catch(error){
    console.error('Error:', error);
    console.error('Error response:', error.response);
    
}
  }
  if(redirect){
    return <Navigate to={`/account/bookings/${bookingId}`}/>
  }

  return (
    <div className='bg-bg min-h-screen p-4'>
      <div className='m-20'>
        <h1 className='text-3xl font-bold'>{currPlace.title}</h1>
        
        
        <a href={'https://maps.google.com/?q='+currPlace.address} className='text-lg mb-2 flex gap-1 items-center'><CiLocationOn size={20}/> {currPlace.address}</a>
        
       
        <div className='flex justify-between'>
          <div className='w-2/3 relative gap-2 grid grid-cols-[2fr_1fr] overflow-hidden rounded-3xl'>
          
           <img
              src={`http://localhost:4000/uploads/${currPlace.addedPhotos[0]}`}
              alt={currPlace.title}
              className='aspect-square object-cover'
            />
           
            <div className='grid '>
              <img
                src={`http://localhost:4000/uploads/${currPlace.addedPhotos[1]}`}
                alt='Photo 1'
                className='aspect-square object-cover'
              />
              <div className='overflow-hidden'>
              <img
                src={`http://localhost:4000/uploads/${currPlace.addedPhotos[2]}`}
                alt='Photo 2'
                className='aspect-square object-cover relative top-2'
              />
              </div>
            </div>
           <button onClick={toggleShowAllPhotos} className='absolute bottom-1 right-1 rounded-lg border bg-opacity-50 bg-white py-1 px-2'>
          show all photos 
           </button>
          </div>
          <div className='w-1/3 bg-white p-4 shadow-lg relative rounded-lg ml-4'>
            <h2 className='text-2xl font-bold flex items-center'><LiaRupeeSignSolid size={20}/>{currPlace.price} per night</h2>
            <div className='mt-4'>
              <label>Check-in</label>
              <input type='date' className='w-full border p-2 rounded-lg'
              value={checkIn} onChange={(e) =>{setCheckIn(e.target.value)}}
               />
              <label>Check-out</label>
              <input type='date' className='w-full border p-2 rounded-lg' value={checkOut} onChange={(e) =>{setCheckOut(e.target.value)}} />
              <label>Guests</label>
              <input type='number' className='w-full border p-2 rounded-lg' value={guestCount} onChange={(e) =>{setGuestCount(e.target.value)}}/>
              {numberOfNights>0&&(
                <div>
                <label>Your full name</label>
                <input type='text' className='w-full border p-2 rounded-lg' value={name} onChange={(e) =>{setName(e.target.value)}}/>
                <label>Phone number</label>
                <input type='text' className='w-full border p-2 rounded-lg' value={mobile} onChange={(e) =>{setMobile(e.target.value)}}/>
                </div>
              )}
              <button className='mt-4 p-2 bg-primary text-white rounded-lg w-full flex justify-center gap-1 items-center' onClick={booking}>Book this stay 
             {numberOfNights>0&&(
                <span className='flex items-center'>
                  for <LiaRupeeSignSolid size={18}/> {numberOfNights*currPlace.price}
                </span>
             )}
              </button>
            </div>
           
            
        <div className='absolute bottom-2 left-2 '>
       <div className='flex items-center gap-1'> <h3 className='text-xl font-bold'>CheckIn</h3><div className='font-semibold'> : {currPlace.checkInTime}</div></div>
       <div className='flex items-center gap-1'> <h3 className='text-xl font-bold'>CheckOut</h3><div className='font-semibold'> : {currPlace.checkOutTime}</div></div>
       <div className='flex items-center gap-1'> <h3 className='text-xl font-bold'>maxGuests</h3><div className='font-semibold'> : {currPlace.maxGuests}</div></div>
        </div>
        
          </div>
        </div>
        <div className='bg-gray-200 rounded-xl p-2 overflow-hidden mt-4'>
        <div className='mt-4 '>
        <h2 className='font-semibold text-2xl'>Description</h2>
       
  <p>
    {currPlace.description.length > 350
      ? `${currPlace.description.slice(0, 350)}...`
      : currPlace.description}
  </p>
  {currPlace.description.length > 350 && (
    <button onClick={toggleShowMoreDescription} className='text-primary mt-2'>
      Show More
    </button>
  )}
  {showMoreDescription && (
  <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
    <div className='bg-bg p-4 rounded-sm w-[50vw]  max-h-[90vh] overflow-y-auto'>
      <h2 className='text-xl font-bold mb-2'>Description About The Stay</h2>
      <p>{currPlace.description}</p>
      <button onClick={toggleShowMoreDescription} className='mt-4 p-2 bg-primary text-white rounded-lg'>
        Close
      </button>
    </div>
  </div>
)}



        </div>
        </div>
        
        <div className='mt-4'>
          <h3 className='text-2xl font-bold'>Extra Info</h3>
          <p>{currPlace.extraInfo}</p>
        </div>
        <div className='mt-4'>
          <h3 className='text-2xl font-bold'>Perks</h3>
          <div className='flex flex-wrap gap-4'>
            {currPlace.perks.includes('Wifi') && (
              <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
                <MdWifi size={25} />
                <span className='text-bold'>Wifi</span>
              </label>
            )}
            {currPlace.perks.includes('Free Parking') && (
              <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
                <MdOutlineLocalParking size={25} />
                <span className='text-bold'>Free Parking</span>
              </label>
            )}
            {currPlace.perks.includes('Kitchen') && (
              <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
                <TbToolsKitchen size={25} />
                <span className='text-bold'>Kitchen</span>
              </label>
            )}
            {currPlace.perks.includes('TV') && (
              <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
                <PiTelevisionSimpleBold size={25} />
                <span className='text-bold'>TV</span>
              </label>
            )}
            {currPlace.perks.includes('Swimming Pool') && (
              <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
                <PiSwimmingPoolBold size={25} />
                <span className='text-bold'>Swimming Pool</span>
              </label>
            )}
            {currPlace.perks.includes('Pets Allowed') && (
              <label className='flex cursor-pointer border p-4 rounded-2xl gap-x-1 items-center'>
                <MdPets size={25} />
                <span className='text-bold'>Pets Allowed</span>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
