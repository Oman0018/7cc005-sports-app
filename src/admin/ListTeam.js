
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import './ListTeam.css';
import { useNavigate } from 'react-router-dom';


const ListTeam = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch matches
  const fetchMatches = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/matches');
      setMatches(res.data);
    } catch (err) {
      console.error('❌ Error fetching matches:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // Delete a match
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this match?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/matches/${id}`);
      setMatches(matches.filter(match => match.id !== id));
    } catch (err) {
      console.error('Failed to delete match', err);
    }
  };

  // Navigate to edit page
  const handleEdit = (id) => {
    navigate(`/admin/EditMatch/${id}`);
  };

  const columns = [
    {
      name: 'Teams',
      cell: row => (
        <div className="team-column">
        <img src={`http://localhost:5000/uploads/${row.TeamOneLogo}`} alt={row.TeamOneName} className="team-logo" />
        <span>{row.TeamOneName}</span>
        <strong className="vs">vs</strong>
        <img src={`http://localhost:5000/uploads/${row.TeamTwoLogo}`} alt={row.TeamTwoName} className="team-logo" />
        <span>{row.TeamTwoName}</span>
      </div>
      ),
      sortable: true
    },
    {
      name: 'Score',
      cell: row => (
        <div className="score-cell">
          <strong>{row.TeamOneScore} - {row.TeamTwoScore}</strong>
        </div>
      ),
      center: true,
    },
    {
      name: 'Date',
      selector: row => row.DateOfMatch,
      cell: row => new Date(row.DateOfMatch).toLocaleDateString(),
      sortable: true
    },
    {
      name: 'Competition',
      selector: row => row.Competition,
      sortable: true
    },
    {
      name: 'Actions',
      width: '150px',
      cell: row => (
        <div className="actions">
          <button onClick={() => handleEdit(row.id)} className="edit-btn">✏️ Edit</button>
          <button onClick={() => handleDelete(row.id)} className="delete-btn">🗑️ Delete</button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  return (
    <div className="match-list-container">
      <h2>Match List</h2>
      <DataTable
        columns={columns}
        data={matches}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        responsive
        defaultSortFieldId={1}
      />
    </div>
  );
};

export default ListTeam;
