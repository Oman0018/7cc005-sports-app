import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Create.css'; // Reuse your styling

const EditMatch = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    // Fetch match by ID
    const fetchMatch = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/matches/${id}`);
        const match = res.data;

        setFormData({
          TeamOneName: match.TeamOneName,
          TeamOneScore: match.TeamOneScore,
          TeamTwoName: match.TeamTwoName,
          TeamTwoScore: match.TeamTwoScore,
          DateOfMatch: match.DateOfMatch.split('T')[0], // Format to yyyy-mm-dd
          Competition: match.Competition
        });
      } catch (err) {
        console.error('❌ Error loading match:', err);
        setMessage('Failed to load match.');
      }
    };

    fetchMatch();
  }, [id]);

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
    const data = new FormData();

    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (TeamOneLogo) data.append('TeamOneLogo', TeamOneLogo);
    if (TeamTwoLogo) data.append('TeamTwoLogo', TeamTwoLogo);

    try {
      await axios.put(`http://localhost:5000/api/matches/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('✅ Match updated successfully!');
      navigate('/admin/list'); // Redirect back to list
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update match.');
    }
  };

  return (
    <div className="match-form-container">
      <h2>Edit Match</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Team One Name</label>
          <input type="text" name="TeamOneName" value={formData.TeamOneName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Team One Logo (optional)</label>
          <input type="file" accept="image/*" onChange={e => handleFileChange(e, 'team1')} />
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
          <label>Team Two Logo (optional)</label>
          <input type="file" accept="image/*" onChange={e => handleFileChange(e, 'team2')} />
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

        <button type="submit" className="submit-btn">Update Match</button>
      </form>
    </div>
  );
};

export default EditMatch;
