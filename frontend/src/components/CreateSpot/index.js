import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//import { Redirect } from 'react-router-dom';
import {createNewSpot} from '../../store/spots'
import './CreateSpot.css'


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
    // const [checkInput, setCheckInput] = useState(true)
    const [name, setName] = useState('')
    const [beds, setBeds] = useState(1)
    const [description, setDescription] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [price, setPrice] = useState(0)
    const [errors, setErrors] = useState([])

    //if (!user) return <Redirect to="/" />;


  const validations = () => {
    const errors = [];
    if (!address) errors.push("Please enter an address");
    if (!city) errors.push("Please enter a city");
    if (!state) errors.push("Please enter a state");
    if (!country) errors.push("Please enter a country");
    if (!previewImage) errors.push("Please include a preview image");
    if (name.length < 2)
      errors.push("Please enter a name with a length greater than 2");
    if (!description) errors.push("Please include a description");
    if (!previewImage) errors.push("Please include a preview image!");
    if (name.length > 25)
      errors.push("Please include a name with a length that is less than 25");
    if (previewImage.length > 255) (errors.push("Please include a different image URL that is less than 255 characters"))
    return errors;
  };


    const handleSubmit = async (e) => {
        e.preventDefault()

        const newSpot = {

            name: name,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            previewImage: previewImage,
            beds: beds,
            description: description,
            price: price
        }

        const validationErrors = validations();
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return;
    }

        //history.push(`/`)
        return dispatch(createNewSpot(newSpot))
        .then(async (res) => {

            history.push(`/spots/ownerSpots`)
        })
        .catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)

        })
    }


    return (
        <div className='createSpotPage'>
            <h1 className='create-title-name'>Enter Your AirBnb's Specifications Below!</h1>
        <form onSubmit={handleSubmit} className='createSpotForm'>
            <ul>
                {errors.map((error, id) => (
                    <li key={id}>{error}</li>
                ))}
            </ul>
            <label className="label">
                Address:
                <input
                type="text"
                placeholder='Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                />
            </label>
            <label className="label">
                City:
                <input
                type="text"
                placeholder='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                />
            </label>
            <label className="label">
                State:
                <input
                type="text"
                placeholder='State'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                />
            </label>
            <label className="label">
                Country:
                <input
                type="text"
                placeholder='country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                />
            </label>
            <label className="label">
                Latitude:
                <input
                type="text"
                placeholder='lat'
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
                />
            </label>
            <label className="label">
                Longitude:
                <input
                type="text"
                placeholder='lng'
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
                />
            </label>
            <label className="label">
                Name:
                <input
                type="text"
                placeholder='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </label>
            <label className="label">
                How Many Beds?:
                <input
                type="text"
                placeholder='beds'
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                required
                />
            </label>
            <label className="label">
                Description:
                <input
                type="text"
                placeholder='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
            </label>
            <label className="label">
                Preview Image:
                <input
                type="text"
                placeholder='url'
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
                required
                />
            </label>
            <label className="label">
                Price:
                <input
                type="text"
                placeholder='Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                />
            </label>
            <button className='createspotbutton' type="submit">Create Spot</button>
        </form>
        </div>
    )
}

export default CreateSpot
