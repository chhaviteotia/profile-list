import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Profile.css"
import { useNavigate } from "react-router-dom";

const API_URL = 'https://jsonplaceholder.typicode.com/users';
const AVATAR_API_URL = 'https://avatars.dicebear.com/api/avataaars/';

function LazyLoading() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(API_URL).then(res => {
      setProfiles(res.data);
      setLoading(false);
    });
  }, []);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLoading(true);
      axios.get(API_URL).then(res => {
        setProfiles(prevProfiles => [...prevProfiles, ...res.data]);
        setLoading(false);
      });
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ><button onClick={()=> navigate('/form')} >Add Profile</button>
      <div></div>
      <h1>Profiles</h1>
      <ul>
        {profiles.map(profile => (
          <li  key={profile.id}> 
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

export default LazyLoading;