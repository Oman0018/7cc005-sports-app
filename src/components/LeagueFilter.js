import React from 'react';

const leagues = [
    {
        code: 'ALL',
        name: 'All Leagues',
        emblem: null,
    },
    {
        code: 'PD',
        name: 'La Liga EA Sports',
        emblem: 'https://crests.football-data.org/laliga.png',
    },
    {
        code: 'PL',
        name: 'Premier League',
        emblem: 'https://crests.football-data.org/PL.png',
    },
    {
        code: 'SA',
        name: 'Serie A',
        emblem: 'https://crests.football-data.org/SA.png',
    },
    {
        code: 'PPL',
        name: 'Primeira Liga',
        emblem: 'https://crests.football-data.org/PPL.png',
    },
    {
        code: 'CL',
        name: 'Champions League',
        emblem: 'https://crests.football-data.org/CL.png',
    },
];

const LeagueFilter = ({ selected, onChange }) => {
    return (
        <div className="flex items-center space-x-2">
            <label className="font-medium">Filter by League:</label>
            <select
                value={selected}
                onChange={onChange}
                className="border rounded p-2 bg-white shadow-sm"
            >
                {leagues.map(league => (
                    <option key={league.code} value={league.code}>
                        {league.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LeagueFilter;
