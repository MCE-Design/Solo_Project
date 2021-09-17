import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { getOneSpot } from "../../store/spots"
import SpotImage from "../SpotImage";
import { bookSpot } from "../../store/booking"
import { getUser } from "../../store/user"

import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';

import './BookingPage.css'

const BookingPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const spotId = parseInt( id );

  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [ startDate, setStartDate] = useState("");
  const [ endDate, setEndDate ] = useState("");
  const [ errors, setErrors ] = useState([]);

  console.log("BookingPageId", id)
  const spots = useSelector(state => state.spots.list);
  const owner = useSelector(state => state.user)[2].userName;
  let spot = {};
  let ownerId = 0;
  if(spots){
    spot = spots[0]; // Hacky destructure, probably a better way
    ownerId = spot.userId;
  }
  console.log("owner", owner)
  useEffect(() => {
    dispatch(getOneSpot(id));
  },[dispatch, id]);

  useEffect(() => {
    dispatch(getUser(ownerId));
  },[dispatch, ownerId])

  console.log("spot", spot)
  console.log("sessionUser", sessionUser)
  console.log("errors", errors)

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentTime = Date.now();
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const payload = {
      spotId,
      userId: sessionUser.id,
      startDate,
      endDate,
    };
    console.log("begin", startDate)
    console.log(startDate <= endDate)
    console.log("Begin same as Stop?", date1.getTime() === date2.getTime())
    console.log("Begin more than Stop?", date1.getTime() > date2.getTime())
    console.log("new date", new Date())
    if(startDate && date1.getTime() < currentTime ){
      return setErrors(['Please make sure that the start date is in the future']);
    }
    if( date1.getTime() >= date2.getTime() ){
      return setErrors(['Please make sure that the end date is after the start date.']);
    }
    if (!sessionUser){
      setShowModal(true);
    }
    if (date1.getTime() > currentTime && date1.getTime() < date2.getTime()) {
      console.log("payload", payload);
      setErrors([]);
      return dispatch(bookSpot( payload, id ))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
  };

  console.log("owner", owner)
  if (!spot) {
    return null;
  }
  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
      <div className="container">
        <div className="page-title">
          <h1>
            {spot.name}
          </h1>
        </div>
        <div id="booking-container">
          <div id="booking-images">
            <SpotImage spotId={id}/>
          </div>
          <div>
            <h2>Dwelling hosted by user {owner}</h2>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
              <label>
                Check-In
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </label>
              <label>
                Check-Out
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Check Availability</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingPage;
