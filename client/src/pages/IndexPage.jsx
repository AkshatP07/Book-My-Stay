import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('/places');
        setPlaces(response.data);
      } catch (e) {
        console.error('Error fetching places', e);
      }
    };
    fetchPlaces();
  }, []);

  return (
    <div className='bg-bg min-h-screen box-border'> 
      <div className="grid grid-cols-4 md:grid-cols-3 m-4 lg:grid-cols-4 sm:grid-cols-1 gap-3">
        {places.length > 0 && places.map((place) => (
          <Link to={'/place/' + place._id} key={place._id}> 
            <div className="bg-white p-4 shadow-md rounded-md mb-4 cursor-pointer flex-grow" style={{ maxWidth: '300px' }}>
              <img src={`http://localhost:4000/uploads/${place.addedPhotos[0]}`} alt={place.title} className="rounded-md w-full h-40 object-cover mb-2" />
              <h2 className="text-xl font-bold mb-2">{place.title}</h2>
              <p className="text-gray-600 mb-2">{place.address}</p>
              <p className="font-bold flex items-center"><LiaRupeeSignSolid/>{place.price} per night</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default IndexPage;
