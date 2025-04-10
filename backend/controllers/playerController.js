exports.getPlayerStats = async (req, res) => {
    try {
        const players = [
            {
                id: 1,
                name: "Erling Haaland",
                team: "Manchester City",
                position: "Forward",
                goals: 27,
                assists: 7,
                appearances: 30,
                image: "https://media.api-sports.io/football/players/276.png"
            },
            {
                id: 2,
                name: "Kylian Mbappé",
                team: "PSG",
                position: "Forward",
                goals: 25,
                assists: 9,
                appearances: 28,
                image: "https://media.api-sports.io/football/players/278.png"
            }
        ];
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: 'Error loading player stats.' });
    }
};
