import React from 'react';

function ChampionsLeagueCard() {
    const competition = {
        id: 2001,
        name: "UEFA Champions League",
        code: "CL",
        type: "CUP",
        emblem: "https://crests.football-data.org/CL.png"
    };

    return (
        <div className="max-w-md mx-auto border p-6 rounded-2xl shadow-md bg-white flex items-center space-x-4">
            <img 
                src={competition.emblem} 
                alt={`${competition.name} logo`} 
                className="w-16 h-16 object-contain" 
            />
            <div>
                <h2 className="text-xl font-bold">{competition.name}</h2>
                <p className="text-gray-600">Code: {competition.code}</p>
                <p className="text-sm text-blue-600 font-medium">{competition.type}</p>
            </div>
        </div>
    );
}

export default ChampionsLeagueCard;
