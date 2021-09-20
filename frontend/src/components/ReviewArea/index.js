import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getAllReviewsId, addReview, editReview, deleteReview } from '../../store/reviews';
import { getUser, getAllUsers } from "../../store/user";
import './ReviewArea.css'

const Reviews = () => {
  const dispatch = useDispatch();
  const { id } =  useParams();
  const spotId = parseInt( id );
  // const history = useHistory();
  const [ errors, setErrors ] = useState([]);
  const [ newReviewRating, setNewReviewRating ] = useState();
  const [ newReviewText, setNewReviewText ] = useState("");
  const [ editComment, setEditComment ] = useState("");

  const sessionUser = useSelector(state => state.session.user);
  const reviews = useSelector(state => state.review.list);
  const reviewParts = useSelector(state => state.review);
  const reviewers = useSelector(state => state.user);

  const reviewersArr = Object.values(reviewers);

  useEffect(() => {
    dispatch(getAllReviewsId(id))
  },[dispatch, id]);

  useEffect(() => {
    dispatch(getAllUsers())
  },[dispatch]);


  // REVIEW SUBMIT Button Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUser.id,
      spotId,
      review: newReviewText,
    };
    if(!newReviewText){
      return setErrors(['You must enter a review before submitting it.']);
    }
    if(newReviewText) {
      setErrors([]);
      const textBox = document.getElementsByClassName('pseudo-text-box')[0];
      textBox.innerText = "";
      dispatch(addReview( payload, id ))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
      return dispatch(getAllReviewsId(id));
    }
  }

  // DELETE Button Handler
  const handleDelete = (e, reviewDeleteId) => {
    e.preventDefault();
    dispatch(deleteReview(reviewDeleteId))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    return (
      dispatch(getAllReviewsId(id)),
      dispatch(getAllReviewsId(id))  // This is way hacky, but for some reason using only one works only after a page reload
    )
  }

  // EDIT Mode Button Handler
  const handleEdit = (e, reviewEditId) => {
    e.preventDefault();
    setEditComment(reviewEditId + "-true");

    const reviewEditText = document.getElementsByClassName(`review-text-id-${reviewEditId}`)[0];
    reviewEditText.setAttribute("contentEditable", true);
    reviewEditText.focus();
  }

  // EDIT SUBMIT Button Handler
  const handleEditSubmit = (e, reviewEditId) => {
    e.preventDefault();
    const reviewEditText = document.getElementsByClassName(`review-text-id-${reviewEditId}`)[0];
    const newText = reviewEditText.innerText;
    const payload = {
      userId: sessionUser.id,
      spotId,
      review: newText,
    };
    if(newText === ''){// Make setter and element for each div.
      return setErrors(['You must enter a review before submitting it.']);
    }
    reviewEditText.setAttribute("contentEditable", false);
    if(newText !== '' && newText !== reviewParts[reviewEditId].review) {
      setErrors([]); // Change this
      setEditComment("false");
      return dispatch(editReview( payload, reviewEditId ))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    setEditComment("false");
  }

  // EDIT CANCEL Button Handler
  const handleEditCancel = (e, reviewEditId) => {
    e.preventDefault();
    setEditComment("false");
    const reviewEditText = document.getElementsByClassName(`review-text-id-${reviewEditId}`)[0];
    reviewEditText.setAttribute("contentEditable", false);
    reviewEditText.innerText = reviewParts[reviewEditId].review;
  }


  // MAIN RENDER
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
              <button type="submit" className="review-submit medium-button">Post Review</button>
              <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
            </form>
          </div>
          <div className="all-reviews">
            {reviews?.map((review) => {
              return(
                <div key={review.id} className={`review-wrapper review-id-${review.id}`}>
                  <div className="review-head">
                    <div className="review-user">
                      {reviewersArr.filter((reviewer) => reviewer.id === review.userId)[0]?.userName}
                    </div>
                    <div className="review-subhead">
                      <div className="review-date">
                        {review.updatedAt}
                      </div>
                      {review.userId === sessionUser.id && (
                        <div className="review-tools">
                          { editComment === `${review.id}-true`?(
                            <>
                              <button onClick={(e) => handleEditCancel(e, review.id)} className="review-edit-cancel small-button">
                                Cancel
                              </button>
                              <button onClick={(e) => handleEditSubmit(e, review.id)} className="review-edit-submit small-button">
                                Submit
                              </button>
                            </>
                          ):(
                            <>
                              <button onClick={(e) => handleEdit(e, review.id)} className="review-edit small-button">
                                Edit
                              </button>
                              <button onClick={(e) => handleDelete(e, review.id)} className="review-delete small-button">
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                        )}
                      </div>
                    </div>
                  <div className={`review-body review-text-id-${review.id}`}>
                    {review.review}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div id="review-box">
        <div className="all-reviews">
            {reviews?.map((review) => {
              return(
                <div key={review.id} className="review-wrapper">
                  <div className="review-head">
                    <div className="review-user">
                      {reviewersArr.filter((reviewer) => reviewer.id === review.userId )[0].userName}
                    </div>
                    <div className="review-date">
                      {review.updatedAt}
                    </div>
                  </div>
                  <div className="review-body">
                    {review.review}
                  </div>
                </div>
              )
            })}
          </div>
      </div>
    </>
  )
}

export default Reviews;
