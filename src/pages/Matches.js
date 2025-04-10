import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeagueFilter from '../components/LeagueFilter';

function Matches() {
    const [matches, setMatches] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [showLiveOnly, setShowLiveOnly] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/matches')
            .then(response => {
                setMatches(response.data);
                setFilteredMatches(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching matches:', error);
                setError('Failed to load matches.');
                setLoading(false);
            });
    }, []);

    const filterMatches = (leagueCode, search, liveOnly, date) => {
        let filtered = matches;

        if (leagueCode !== 'ALL') {
            filtered = filtered.filter(match => match.competition.code === leagueCode);
        }

        if (search) {
            filtered = filtered.filter(match =>
                match.homeTeam.name.toLowerCase().includes(search) ||
                match.awayTeam.name.toLowerCase().includes(search)
            );
        }

        if (liveOnly) {
            filtered = filtered.filter(
                match => match.status === 'LIVE' || match.status === 'IN_PLAY'
            );
        }

        if (date) {
            filtered = filtered.filter(match => {
                const matchDate = new Date(match.utcDate).toISOString().split('T')[0];
                return matchDate === date;
            });
        }

        setFilteredMatches(filtered);
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setSelectedLeague(value);
        filterMatches(value, searchTerm, showLiveOnly, selectedDate);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        filterMatches(selectedLeague, value, showLiveOnly, selectedDate);
    };

    const handleLiveToggle = (e) => {
        const checked = e.target.checked;
        setShowLiveOnly(checked);
        filterMatches(selectedLeague, searchTerm, checked, selectedDate);
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        setSelectedDate(value);
        filterMatches(selectedLeague, searchTerm, showLiveOnly, value);
    };

    const getStatusBadge = (status) => {
        const statusStyles = {
            TIMED: 'bg-yellow-100 text-yellow-800',
            LIVE: 'bg-green-100 text-green-800',
            IN_PLAY: 'bg-green-100 text-green-800',
            FINISHED: 'bg-red-100 text-red-800',
        };
        const style = statusStyles[status] || 'bg-gray-100 text-gray-800';
        return (
            <span className={`px-2 py-1 rounded text-sm font-semibold ${style}`}>
                {status}
            </span>
        );
    };

    if (loading) return <p className="p-6">Loading matches...</p>;
    if (error) return <p className="p-6 text-red-600">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Upcoming Matches</h1>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <LeagueFilter selected={selectedLeague} onChange={handleFilterChange} />

                <input
                    type="text"
                    placeholder="Search by team name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border p-2 rounded w-full sm:w-64"
                />

                <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="border p-2 rounded"
                />

                <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={showLiveOnly} onChange={handleLiveToggle} />
                    <span>Live Only</span>
                </label>
            </div>

            {/* Match List */}
            <ul className="space-y-4">
                {filteredMatches.map(match => (
                    <li key={match.id} className="border p-4 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img src={match.homeTeam.crest} alt={match.homeTeam.name} className="w-8 h-8" />
                                <span className="font-semibold">{match.homeTeam.name}</span>
                                <span>vs</span>
                                <img src={match.awayTeam.crest} alt={match.awayTeam.name} className="w-8 h-8" />
                                <span className="font-semibold">{match.awayTeam.name}</span>
                            </div>
                            {getStatusBadge(match.status)}
                        </div>
                        <div className="text-gray-600 mt-2">
                            {new Date(match.utcDate).toLocaleString()} — {match.competition.name} ({match.area.name})
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Matches;
