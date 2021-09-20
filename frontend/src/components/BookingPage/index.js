import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { getOneSpot } from "../../store/spots"
import SpotImage from "../SpotImage";
import { bookSpot, deleteBooking, getAllBookingsId } from "../../store/booking"
import { getUser } from "../../store/user"

import { Modal } from '../../context/Modal';
import Reviews from '../ReviewArea';
import LoginForm from '../LoginFormModal/LoginForm';

import './BookingPage.css'

const BookingPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const spotId = parseInt( id );

  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [ startDate, setStartDate] = useState("");
  const [ endDate, setEndDate ] = useState("");
  const [ errors, setErrors ] = useState([]);

  const spots = useSelector(state => state.spots.list);
  const owner = useSelector(state => state.user);
  let spot = {};
  let ownerId = 0;
  let ownerName

  useEffect(() => {
    dispatch(getOneSpot(id));
  },[dispatch, id]);

  if(spots){
    spot = spots[0]; // Hacky destructure, probably a better way
    ownerId = spot.userId;
  }

  useEffect(() => {
    dispatch(getUser(ownerId));
  },[dispatch, ownerId]);

  if(owner[ownerId]){
    ownerName = owner[ownerId].userName;
  }

  useEffect(() => {
    dispatch(getAllBookingsId(spotId));
  },[dispatch, spotId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentTime = Date.now();
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    let payload = {}
    if (sessionUser === undefined){
      setShowModal(true);
    } else {
      if( showModal === true ){
        dispatch(setShowModal(false));
      }
      payload = {
        spotId,
        userId: sessionUser.id,
        startDate,
        endDate,
      };
    }

    if(startDate && date1.getTime() < currentTime ){
      return setErrors(['Please make sure that the start date is in the future']);
    }
    if( date1.getTime() >= date2.getTime() ){
      return setErrors(['Please make sure that the end date is after the start date.']);
    }
    if (date1.getTime() > currentTime && date1.getTime() < date2.getTime()) {
      setErrors([]);
      dispatch(bookSpot( payload, id ))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
      return(
        history.push("/profile")
      )
    }
  };

  const bookingDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteBooking(13))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
    });
  };

  if (!spot || !ownerName) {
    return null;
  }
  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
      <div className="container booking-page">
        <div className="page-title">
          <h1>
            {spot.name}
          </h1>
          {/* <div>
            Rating
          </div> */}
        </div>
        <div id="booking-container">
          <div id="booking-images">
            <SpotImage spotId={id}/>
          </div>
          <div id="booking-owner">
            <h2>Dwelling hosted by {ownerName}</h2>
            {/* <button onClick={bookingDelete}>Delete Booking</button> */}
          </div>
          <div id="booking-form">
            <form onSubmit={handleSubmit}>
              <div className="booking-form-top">
                <label>
                  Check-In
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
                <label>
                  Check-Out
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="booking-submit medium-button">Book Lodging</button>
              <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
            </form>
          </div>
          <Reviews />
        </div>
      </div>
    </>
  );
}

export default BookingPage;
