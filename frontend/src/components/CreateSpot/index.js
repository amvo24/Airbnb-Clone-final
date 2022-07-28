import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {createNewSpot} from '../../store/spots'


const CreateSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState(1)
    const [lng, setLng] = useState(1)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [price, setPrice] = useState(0)

    const [errors, setErrors] = useState([])
    if (!user) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const newSpot = {
            name: name,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            previewImage: previewImage,
            description: description,
            price: price
        }

        history.push(`/`)
        // history.push(`/spots/${newSpot.id}`)
        return dispatch(createNewSpot(newSpot))
    }


    return (
        <form onSubmit={handleSubmit} className='createSpotForm'>
            <ul>
                {errors.map((error, id) => (
                    <li key={id}>{error}</li>
                ))}
            </ul>
            <label>
                Address:
                <input
                type="text"
                placeholder='Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                />
            </label>
            <label>
                City:
                <input
                type="text"
                placeholder='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                />
            </label>
            <label>
                State:
                <input
                type="text"
                placeholder='State'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                />
            </label>
            <label>
                Country:
                <input
                type="text"
                placeholder='country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                />
            </label>
            <label>
                Latitude:
                <input
                type="text"
                placeholder='lat'
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
                />
            </label>
            <label>
                Longitude:
                <input
                type="text"
                placeholder='lng'
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
                />
            </label>
            <label>
                Name:
                <input
                type="text"
                placeholder='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </label>
            <label>
                Description:
                <input
                type="text"
                placeholder='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
            </label>
            <label>
                Preview Image:
                <input
                type="text"
                placeholder='url'
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
                required
                />
            </label>
            <label>
                Price:
                <input
                type="text"
                placeholder='Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                />
            </label>
            <button type="submit">Create Spot</button>
        </form>
    )
}

export default CreateSpot
