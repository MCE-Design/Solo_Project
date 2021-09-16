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
      <div className="container">
        <div className="page-title">
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
                    <div className="spot-name">
                      {spot.name}
                    </div>
                    <div className="spot-address-block">
                      <div>
                        {spot.address}
                      </div>
                      <div className="spot-city">
                        {spot.city}
                      </div>
                      <div className="spot-state">
                        {spot.state}
                      </div>
                      <div className="spot-country">
                        {spot.country}
                      </div>
                    </div>
                    <div className="spot-price">
                      {spot.price}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default SpotsPage;
