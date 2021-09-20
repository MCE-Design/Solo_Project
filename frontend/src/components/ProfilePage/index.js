import './ProfilePage.css';

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { getSpots } from "../../store/spots"
import SpotImage from "../SpotImage";
import { bookSpot, deleteBooking, getAllBookingsId, getUserBookings } from "../../store/booking"
import { getUser } from "../../store/user"

import { Modal } from '../../context/Modal';


const ProfilePage = () => {
  const dispatch = useDispatch();
  const [ errors, setErrors ] = useState([]);
  const sessionUser = useSelector(state => state.session.user);
  const currentUserId = sessionUser.id
  const bookings = useSelector(state => state.booking.list);
  const spots = useSelector(state => state.spots);

  useEffect(() => {
    dispatch(getUserBookings(currentUserId));
  },[dispatch, currentUserId])

  useEffect(() => {
    dispatch(getSpots());
  },[dispatch])

  const bookingDelete = (e, deleteBookingId) => {
    e.preventDefault();
    dispatch(deleteBooking(deleteBookingId))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
    });
    return dispatch(getUserBookings(currentUserId));
  };

  console.log(spots)
  console.log("Bookings", bookings)
  if( sessionUser ){
    return (
      <>
        <div className="container profile-page">
          <h1>Manage Reservations</h1>
          <div id="bookings-container">
            {bookings?.map((booking) => {
              return(
                <>
                  <div className="booking-wrapper">
                    <SpotImage spotId={booking.spotId}/>
                    <div className="booking-dates">
                      <div className="booking-start">
                        {/* {booking.startDate} */}
                      </div>
                      <div className="booking-end">
                        {/* {booking.endDate} */}
                      </div>
                      <div className="booking-tools">
                        <button onClick={(e) => bookingDelete(e, booking.id)} className="booking-cancel-button">Cancel Reservation</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            )}
          </div>
        </div>
      </>
    )
  }
  return (
    <Redirect path="/"/>
  )
}

export default ProfilePage;
