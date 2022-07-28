import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { editSpotById } from '../../store/spots'
import './editspot.css'


const EditSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const spot = useSelector((state) => state.spotInRootReducer)
    let { id } = useParams()
    id = Number(id)

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState(1)
    const [lng, setLng] = useState(1)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    //const [image, setImage] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [price, setPrice] = useState(0)
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
    const updatePrice = (e) => setPrice(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);

    //if (!user) return <Redirect to="/" />;
    if (submitted) return <Redirect to={`/spot/${id}`}/>

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
            description: description,
            price: price
        }

        //history.push(`/spots/${newSpot.id}`)
        //history.push(`/`)
        return dispatch(editSpotById(editedSpot, spot.id))
        .then(async (res) => {
            console.log("success");
            setSubmitted(true);
          })
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
      };



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
                onChange={updateAddress}
                required
                />
            </label>
            <label>
                City:
                <input
                type="text"
                placeholder='City'
                value={city}
                onChange={updateCity}
                required
                />
            </label>
            <label>
                State:
                <input
                type="text"
                placeholder='State'
                value={state}
                onChange={updateState}
                required
                />
            </label>
            <label>
                Country:
                <input
                type="text"
                placeholder='country'
                value={country}
                onChange={updateCountry}
                required
                />
            </label>
            <label>
                Latitude:
                <input
                type="text"
                placeholder='lat'
                value={lat}
                onChange={updateLat}
                required
                />
            </label>
            <label>
                Longitude:
                <input
                type="text"
                placeholder='lng'
                value={lng}
                onChange={updateLng}
                required
                />
            </label>
            <label>
                Name:
                <input
                type="text"
                placeholder='name'
                value={name}
                onChange={updateName}
                required
                />
            </label>
            <label>
                Description:
                <input
                type="text"
                placeholder='description'
                value={description}
                onChange={updateDescription}
                required
                />
            </label>
            <label>
                Preview Image:
                <input
                type="text"
                placeholder='Preview Image'
                value={previewImage}
                onChange={updatePreviewImage}
                required
                />
            </label>
            <label>
                Price:
                <input
                type="text"
                placeholder='Price'
                value={price}
                onChange={updatePrice}
                required
                />
            </label>
            <button id='submitbutton' type="submit">Edit Spot</button>
        </form>
    )
}

export default EditSpot
