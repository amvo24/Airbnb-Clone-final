import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {createReviewBasedOnSpotsId} from '../../store/review'


const CreateReview = ({id}) => {
    const dispatch = useDispatch();
    const history = useHistory()

    const user = useSelector((state) => state.session.user)

    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [errors, setErrors] = useState([])

    if (!user) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const newReview = {
            review,
            stars
        }

        history.push(`/spots/${id}`)
        return dispatch(createReviewBasedOnSpotsId(newReview, id))
    }


    return (
        <form onSubmit={handleSubmit} className='createSpotForm'>
            <ul>
                {errors.map((error, id) => (
                    <li key={id}>{error}</li>
                ))}
            </ul>
            <label>
                Leave Your Review Here:
                <input
                type="text"
                placeholder='Review'
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                />
            </label>
            <label>
                Stars:
                <input
                type="text"
                placeholder='Stars'
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                required
                />
            </label>

            <button type="submit">Create Review</button>
        </form>
    )
}

export default CreateReview
