import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Booking = () => {
  const { action } = useParams();
  const [bookingData, setBookingData] = useState(null);
  const [allBookingData, setAllBookingData] = useState(null);

  useEffect(() => {
    const fetchAllBookingData = async () => {
      try {
        const response = await axios.get(`/allBookings`);
        setAllBookingData(response.data);
      } catch (error) {
        console.error('Error fetching all bookings:', error);
      }
    };

    // Fetch all bookings only once
    fetchAllBookingData();
  }, []);

  useEffect(() => {
    if (action) {
      const fetchBookingData = async () => {
        try {
          const response = await axios.get(`/myBooking/${action}`);
          setBookingData(response.data);
        } catch (error) {
          console.error('Error fetching booking data:', error);
        }
      };

      fetchBookingData();
    }
  }, [action]);

  return (
    <div>
      {!action ? (
        <div>
          {allBookingData ? (
            <div className="grid grid-cols-4 md:grid-cols-3 m-4 lg:grid-cols-4 sm:grid-cols-1 gap-3">
              {allBookingData.data.length > 0 ? (
                allBookingData.data.map((data) => (
                  <div key={data._id}>{data.name}</div> // Assuming `data._id` is unique
                ))
              ) : (
                <p>No bookings available.</p>
              )}
            </div>
          ) : (
            <p>No bookings available.</p>
          )}
        </div>
      ) : (
        <div>
          {bookingData ? (
            <div>
              <h2>Booking Details</h2>
              <p>{bookingData.data.name}</p>
              {/* Render other booking data as needed */}
            </div>
          ) : (
            <p>Loading booking details...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Booking;
