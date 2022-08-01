import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {createReviewBasedOnSpotsId} from '../../store/review'
import './createReview.css'


const CreateReview = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    let { id } = useParams()
    id = Number(id)
    const user = useSelector((state) => state.session.user)

    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [errors, setErrors] = useState([])

    // if (!user) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const newReview = {
            review,
            stars
        }

        history.push(`/spots/${id}`)
        //history.push(`/`)
        return dispatch(createReviewBasedOnSpotsId(newReview, id))
    }


    return (
        <div className='createreviewrootdiv'>
            <h1 className='createreviewtitle354'>{`Leave A Review Down Below!`}</h1>
        <div className='createReviewDiv33'>
        <form className="createSpotForm" onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, id) => (
                    <li key={id}>{error}</li>
                ))}
            </ul>
            <label className='label'>
                Leave Your Review Here:
                <textarea
                id="reviewInput"
                type="text"
                placeholder='Review'
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                />
            </label>
            <label className='label'>
                Stars:
                <textarea
                id="reviewInput"
                type="text"
                placeholder='Stars'
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                required
                />
            </label>

            <button className='createButtonforReviews' type="submit">Create Review</button>
        </form>
        </div>
        </div>
    )
}

export default CreateReview
