import { render, screen } from '@testing-library/react';
import MatchCard from '../admin/MatchCard';

test('renders team names in MatchCard', () => {
  const match = {
    TeamOneName: "Arsenal",
    TeamTwoName: "Chelsea",
    TeamOneLogo: "arsenal.png",
    TeamTwoLogo: "chelsea.png",
    TeamOneScore: 2,
    TeamTwoScore: 1,
    DateOfMatch: "2025-05-10",
    Competition: "Premier League"
  };

  render(<MatchCard match={match} />);
  expect(screen.getByText(/Arsenal/i)).toBeInTheDocument();
  expect(screen.getByText(/Chelsea/i)).toBeInTheDocument();
});
