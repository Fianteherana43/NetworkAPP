import React, { useState, useEffect } from 'react';
import cross_icon from '../../assets/react.svg';
import { useParams } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { userId } = useParams();

  const updateProfileImage = async () => {
    let formData = new FormData();
    formData.append('profile', selectedImage);

    const response = await fetch(`http://localhost:3000/api/prof/upload/${userId}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.error('Failed to update profile image URL');
    } else {
      const data = await response.json();
      setProfileDetails(prevDetails => ({
        ...prevDetails,
        profil_image_url: data.imageUrl,
      }));
    }
  };

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/prof/profile/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile data.');
        }
        const data = await response.json();
        if (data && typeof data === 'object') {
          setProfileDetails(data);
          console.log(data);
        } else {
          throw new Error('Invalid profile data format.');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    
    fetchProfileInfo();
  }, [userId]); // Déclenche l'effet à chaque changement de userId

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfileImage();
  };

  if (!profileDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="profile">
      
      <div>
        <h1>{profileDetails.user_name}</h1>
      </div> 
       
      <div className="profile-image">
          <img src={profileDetails.profil_image_url || cross_icon} alt="Profile picture" />
          <input type="file" name="image" id="file-input" onChange={handleImageChange} />
          <label htmlFor="file-input">Change Photo</label>
      </div>

        <div className="profile-user-settings">
       
        
    

          <p class="profile-firstname">{profileDetails.first_name} {profileDetails.last_name}</p>
        
        </div>

        <div className="profile-stats">
          <ul>
            <li><span className="profile-stat-count">{profileDetails.followers_id}</span> Followers</li>
            <li><span className="profile-stat-count">{profileDetails.followed_id}</span> Followed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
