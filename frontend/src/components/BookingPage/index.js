import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { getOneSpot } from "../../store/spots"
import SpotImage from "../SpotImage";

import LoginFormModal from "../LoginFormModal/"

import './BookingPage.css'

const BookingPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const sessionUser = useSelector(state => state.session.user);
  const [ beginDate, setBeginDate] = useState();
  const [ stopDate, setStopDate ] = useState();
  const [errors, setErrors] = useState([]);

  console.log("BookingPageId", id)
  const spots = useSelector(state => state.spots.list);
  let spot = {}

  if(spots){
    spot = spots[0]; // Hacky destructure, probably a better way
  }

  useEffect(() => {
    dispatch(getOneSpot(id));
  },[dispatch, id]);

  console.log("spot", spot)

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!sessionUser) return (
    //   LoginFormModal()
    // );
    // if (password === confirmPassword) {
    //   setErrors([]);
    //   return dispatch(sessionActions.signup({ email, userName, password }))
    //     .catch(async (res) => {
    //       const data = await res.json();
    //       if (data && data.errors) setErrors(data.errors);
    //     });
    // }
    // return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  if (!spot) {
    return null;
  }
  return (
    <>
      <div className="container">
        <div className="page-title">
          <h1>
            {spot.name}
          </h1>
        </div>
        <div id="booking-container">
          Yep, this is the booking page for Id {id}!
          <div id="booking-images">
            <SpotImage spotId={id}/>
          </div>
          <div>
            <h2>Dwelling hosted by user {spot.userId}</h2>
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
                  value={beginDate}
                  onChange={(e) => setBeginDate(e.target.value)}
                  required
                />
              </label>
              <label>
                Check-Out
                <input
                  type="date"
                  value={stopDate}
                  onChange={(e) => setStopDate(e.target.value)}
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
