import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getAllReviewsId } from '../../store/reviews'
import './ReviewArea.css'

const Reviews = () => {
  const dispatch = useDispatch();
  const { id } =  useParams();
  const spotId = parseInt( id );
  // const history = useHistory();
  const [ errors, setErrors ] = useState([]);
  const [ newReviewRating, setNewReviewRating ] = useState();
  const [ newReviewText, setNewReviewText ] = useState("");
  const sessionUser = useSelector(state => state.session.user);
  const reviews = useSelector(state => state.session.reviews);

  useEffect(() => {
    dispatch(getAllReviewsId(id))
  },[dispatch, id])

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      spotId,
      userId: sessionUser.id,
      newReviewText,
    };
    console.log("review payload", payload)
  }

  if( sessionUser !== undefined ){
    return(
      <>
        <div id="review-box">
          <div className="new-review">
            <form onSubmit={handleSubmit}>
              {/* <fieldset className="rating">
                <ul>
                  <li>
                    <input type="radio" name="rating" value="1" />
                  </li>
                  <li>
                    <input type="radio" name="rating" value="2" />
                  </li>
                  <li>
                    <input type="radio" name="rating" value="3" />
                  </li>
                  <li>
                    <input type="radio" name="rating" value="4" />
                  </li>
                  <li>
                    <input type="radio" name="rating" value="5" />
                  </li>
                </ul>
              </fieldset> */}
              <div
                className="pseudo-text-box"
                contentEditable="true"
                textcontent={newReviewText}
                onInput={(e) => setNewReviewText(e.currentTarget.textContent)}
                required
              >

              </div>
              <button type="submit">Post Review</button>
              <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
            </form>
          </div>
          <div className="all-reviews">

          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div id="review-box">
        ONLY reviews
        <div className="all-reviews">

        </div>
      </div>
    </>
  )
}

export default Reviews;
