import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Profile.css"


const API_URL = 'https://jsonplaceholder.typicode.com/users';
const AVATAR_API_URL = 'https://avatars.dicebear.com/api/avataaars/';

function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_URL).then(res => {
      setProfiles(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2>Profiles</h2>
      <ul>
        {profiles.map(profile => (
          <li key={profile.id}>
            <img className='profile-card'
              src={`${AVATAR_API_URL}${profile.name}.svg`}
              alt={profile.name}
            />
            {profile.name}
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
}

function AddProfileForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const newProfile = { name, email, phone, website };
    axios.post(API_URL, newProfile).then(res => {
      setName('');
      setEmail('');
      setPhone('');
      setWebsite('');
      alert('Profile added successfully!');
    });
  }

  return (
    <div>
      <h2>Add Profile</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={event => setName(event.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={event => setPhone(event.target.value)}
          required
        />
        <label htmlFor="website">Image url:</label>
        <input
          type="url"
          id="website"
          value={website}
          onChange={event => setWebsite(event.target.value)}
          required
        />
        <div>
        <button type="submit">Add</button>
        </div>
      </form>
      
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <AddProfileForm />
      <ProfileList />
    </div>
  );
}

export default Dashboard;