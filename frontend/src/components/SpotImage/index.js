import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../store/spotImages"

const SpotImage = ({spotId}) => {
  const dispatch = useDispatch();
  const images = useSelector(state => state.images.list);


  useEffect(() => {
    dispatch(getImages(spotId));
  },[dispatch, spotId]);

  console.log(images)
  if (!images) {
    return null;
  }
  return (
    <div className="spot-image">
      {images.map((image) => {
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
