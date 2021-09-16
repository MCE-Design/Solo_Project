import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../store/spotImages"

const SpotImage = ({spotId}) => {
  const dispatch = useDispatch();
  const images = useSelector(state => state.images);
  const imagesArr = Object.values(images);
  const imageFilteredArr = imagesArr.filter((image) => image.spotId === +spotId );


  useEffect(() => {
    dispatch(getImages(spotId));
  },[dispatch, spotId]);

  if (!images) {
    return null;
  }
  return (
    <div className="spot-image">
      {imageFilteredArr.map((image) => {
        return(
          <div key={image.id} className="image-wrapper">
            <img src={image.url} alt="" />
          </div>
        )
      })}
    </div>
  );
}

export default SpotImage;
