let scores, totalKills = 0;

function setScores(s) { scores = s; }
function setTotalKills(tk) { totalKills = tk; }
function incrementTotalKills() { totalKills++; }
function incrementScoreByValue(value) { scores += value; }

function getScores() { return scores; }
function getTotalKills() { return totalKills; }

export { setScores, getScores, setTotalKills, getTotalKills, incrementTotalKills, incrementScoreByValue }