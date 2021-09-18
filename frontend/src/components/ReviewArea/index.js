import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getAllReviewsId } from '../../store/reviews'
import './ReviewArea.css'

const Reviews = () => {
  const dispatch = useDispatch();
  const { id } =  useParams();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(getAllReviewsId(id))
  },[dispatch, id])

  if( sessionUser !== undefined ){
    return(
      <>
        <div>
          This is the review area
          With edit form
          <form>

          </form>
        </div>
      </>
    )
  }
  return (
    <>
      <div>
      This is the review area
      NO EDIT
      </div>
    </>
  )
}

export default Reviews;
