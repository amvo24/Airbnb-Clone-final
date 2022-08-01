import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { editSpotById } from '../../store/spots'
import './editspot.css'


const EditSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    let { id } = useParams()
    id = Number(id)
    const spot = useSelector((state) => state.spotInRootReducer[id])


    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    const [country, setCountry] = useState(spot?.country)
    const [lat, setLat] = useState(spot?.lat)
    const [lng, setLng] = useState(spot?.lng)
    const [name, setName] = useState(spot?.name)
    const [beds, setBeds] = useState(spot?.beds)
    const [description, setDescription] = useState(spot?.description)
    //const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState(spot?.previewImage)
    const [price, setPrice] = useState(spot?.price)
    const [errors, setErrors] = useState([])
    const [submitted, setSubmitted] = useState(false)

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateBeds = (e) => setBeds(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);

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
        if (previewImage.length > 255)
          errors.push(
            "Please include a different image URL that is less than 255 characters"
          );
        return errors;
      };


    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])

        const editedSpot = {
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
      setErrors(validationErrors);
      return;
    }


        //history.push(`/`)
        return dispatch(editSpotById(editedSpot, id))
        .then(() => {
            history.push(`/spots/${id}`)
          })
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
      };



    return (
        <div className='createSpotPage'>
        {/* <h1 className='create-title-name'>Edit Your AirBnb Below!</h1> */}
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
                onChange={updateAddress}
                required
                />
            </label>
            <label className="label">
                City:
                <input
                type="text"
                placeholder='City'
                value={city}
                onChange={updateCity}
                required
                />
            </label>
            <label className="label">
                State:
                <input
                type="text"
                placeholder='State'
                value={state}
                onChange={updateState}
                required
                />
            </label>
            <label className="label">
                Country:
                <input
                type="text"
                placeholder='country'
                value={country}
                onChange={updateCountry}
                required
                />
            </label>
            <label className="label">
                Latitude:
                <input
                type="text"
                placeholder='lat'
                value={lat}
                onChange={updateLat}
                required
                />
            </label>
            <label className="label">
                Longitude:
                <input
                type="text"
                placeholder='lng'
                value={lng}
                onChange={updateLng}
                required
                />
            </label>
            <label className="label">
                Name:
                <input
                type="text"
                placeholder='name'
                value={name}
                onChange={updateName}
                required
                />
            </label>
            <label className="label">
                How Many Beds?:
                <input
                type="text"
                placeholder='beds'
                value={beds}
                onChange={updateBeds}
                required
                />
            </label>
            <label className="label">
                Description:
                <input
                type="text"
                placeholder='description'
                value={description}
                onChange={updateDescription}
                required
                />
            </label>
            <label className="label">
                Preview Image:
                <input
                type="text"
                placeholder='Preview Image'
                value={previewImage}
                onChange={updatePreviewImage}
                required
                />
            </label>
            <label className="label">
                Price:
                <input
                type="text"
                placeholder='Price'
                value={price}
                onChange={updatePrice}
                required
                />
            </label>
            <button className='editbutton28376' type="submit">Edit Spot</button>
        </form>
        </div>
    )
}

export default EditSpot
