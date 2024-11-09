import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState({
    bio: '',
    profilePicture: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/profile/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setProfile(response.data);
        setPreview(response.data.profilePicture);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDeletePicture = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      profilePicture: '',
    }));
    setPreview('');
    setSelectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', profile.bio);
    if (selectedFile) {
      formData.append('profilePicture', selectedFile);
    } else {
      formData.append('profilePicture', '');
    }

    try {
      await axios.put('/api/profile/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-start">
          <img
            src={preview || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="img-thumbnail mb-3"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
            style={{ width: '300px', height: '38px', objectFit: 'cover' }}
          />
          <button
            type="button"
            onClick={handleDeletePicture}
            className="btn btn-secondary mt-2"
            style={{ width: '300px', height: '38px', objectFit: 'cover' }}
          >
            Delete Profile Picture
          </button>
        </div>
        <div className="mb-3">
          <label htmlFor="bio" className="form-label">Bio</label>
          <textarea
            className="form-control"
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            style={{ width: '300px', height: '100px', objectFit: 'cover' }}

          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;