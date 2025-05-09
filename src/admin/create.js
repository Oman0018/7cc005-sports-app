import React, { useState } from 'react';
import axios from 'axios';
import './Create.css'; // Ensure this CSS file exists

const Create = () => {
  const [formData, setFormData] = useState({
    TeamOneName: '',
    TeamOneScore: '',
    TeamTwoName: '',
    TeamTwoScore: '',
    DateOfMatch: '',
    Competition: ''
  });

  const [TeamOneLogo, setTeamOneLogo] = useState(null);
  const [TeamTwoLogo, setTeamTwoLogo] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, team) => {
    if (team === 'team1') {
      setTeamOneLogo(e.target.files[0]);
    } else {
      setTeamTwoLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Create a FormData object
    const data = new FormData();
    data.append('TeamOneName', formData.TeamOneName);
    data.append('TeamOneScore', formData.TeamOneScore);
    data.append('TeamTwoName', formData.TeamTwoName);
    data.append('TeamTwoScore', formData.TeamTwoScore);
    data.append('DateOfMatch', formData.DateOfMatch);
    data.append('Competition', formData.Competition);
    if (TeamOneLogo) data.append('TeamOneLogo', TeamOneLogo);
    if (TeamTwoLogo) data.append('TeamTwoLogo', TeamTwoLogo);

    try {
      const res = await axios.post('http://localhost:5000/api/CreateMatches', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('✅ Match created successfully!');
      console.log('Response:', res.data);

      // Reset form
      setFormData({
        TeamOneName: '',
        TeamOneScore: '',
        TeamTwoName: '',
        TeamTwoScore: '',
        DateOfMatch: '',
        Competition: ''
      });
      setTeamOneLogo(null);
      setTeamTwoLogo(null);
    } catch (err) {
      console.error(err);
      setMessage('Failed to create match');
    }
  };

  return (
    <div className="match-form-container">
      <h2>Create Match</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Team One Name</label>
          <input type="text" name="TeamOneName" value={formData.TeamOneName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Team One Logo</label>
          <input type="file" accept="image/*" onChange={e => handleFileChange(e, 'team1')} required />
        </div>

        <div className="form-group">
          <label>Team One Score</label>
          <input type="number" name="TeamOneScore" value={formData.TeamOneScore} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Team Two Name</label>
          <input type="text" name="TeamTwoName" value={formData.TeamTwoName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Team Two Logo</label>
          <input type="file" accept="image/*" onChange={e => handleFileChange(e, 'team2')} required />
        </div>

        <div className="form-group">
          <label>Team Two Score</label>
          <input type="number" name="TeamTwoScore" value={formData.TeamTwoScore} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Date of Match</label>
          <input type="date" name="DateOfMatch" value={formData.DateOfMatch} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Competition</label>
          <input type="text" name="Competition" value={formData.Competition} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn">Create Match</button>
      </form>
    </div>
  );
};

export default Create;
