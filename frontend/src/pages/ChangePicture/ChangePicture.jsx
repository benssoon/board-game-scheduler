import './ChangePicture.css';
import {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {API} from '../../globalConstants.js';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';

function ChangePicture() {
    const [newImage, setNewImage] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => { // To prevent memory leaks.
        if (!newImage) return;

        const objectUrl = URL.createObjectURL(newImage);
        return () => URL.revokeObjectURL(objectUrl);
    }, [newImage]);

    function handleImageChange(e) {
        setNewImage(e.target.files[0]);
    }

    function clearImage() {
        setNewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the value of the file input.
        }
    }

    async function uploadImage(e) { /*TODO Update NavBar image when profilePicture is updated*/
        e.preventDefault();
        if (!newImage) return;
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('profilePicture', newImage); // Creates a FormData object, which will give the header Content-Type: multipart/form-data
        try {
            const result = await axios.post(`${API}/images/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(result.data);
            navigate('/profile');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form className={'change-form'} onSubmit={uploadImage}>
            <div className={'upload-block'}>
                <label htmlFor={'profile-picture'} className="custom-file-upload">Select File</label>
                <input
                    type={'file'}
                    accept={'image/*'}
                    id={'profile-picture'}
                    name={'file'}
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
                {newImage && <div className={'image-with-x'}>
                    <button type={'button'} className={'x-button'} onClick={clearImage}>X</button>
                    <img
                        src={URL.createObjectURL(newImage)}
                        alt={'Preview of selected image'}
                    />
                </div>}
            </div>
            <button type={'submit'}>Submit</button>
            {/*TODO Remove image functionality*/}
        </form>
    );
}

export default ChangePicture;