import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spots"
import SpotImage from "../SpotImage";

import './SpotsPage.css'

const SpotsPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.list);


  useEffect(() => {
    dispatch(getSpots());
  },[dispatch]);

  if (!spots) {
    return null;
  }

  return (
    <>
      <div>
        <h1>
          Adventurous Stays
        </h1>
      </div>
      <div id="spots-container">
        {spots.map((spot) => {
            return (
              <div key={spot.id} className="spot">
                <SpotImage spotId={spot.id}/>
                <div className="spot-text">
                  <div id="spot-name">
                    {spot.name}
                  </div>
                  <div id="spot-address-block">
                    <div>
                      {spot.address}
                    </div>
                    <div>
                      {spot.city}
                    </div>
                    <div>
                      {spot.state}
                    </div>
                    <div>
                      {spot.country}
                    </div>
                  </div>
                  <div>
                    {spot.price}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default SpotsPage;
