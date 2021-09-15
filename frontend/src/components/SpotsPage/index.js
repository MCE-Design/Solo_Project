import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots"

import './SpotsPage.css'

const SpotsPage = () => {
  const dispatch = useDispatch();

  // const spot = useSelector(state => {
  //   return state.spots.list.map(spotId => state.spot[spotId]);
  // });

  useEffect(() => {
    dispatch(getSpots());
  },[dispatch]);

  console.log()
  return (
    <div id="spots-body">

    </div>
  );
}

export default SpotsPage;
