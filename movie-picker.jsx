import React, { useState, useEffect, useRef } from 'react';

// --- Movie Data ---
const MOVIE_DATA = [
    { title: "Gone With The Wind", poster: "https://image.tmdb.org/t/p/w1280/lNz2Ow0wGCAvzckW7EOjE03KcYv.jpg", year: "1939", imdb: "https://www.imdb.com/title/tt0031381/" },
    { title: "Casablanca", poster: "https://image.tmdb.org/t/p/w1280/lGCEKlJo2CnWydQj7aamY7s1S7Q.jpg", year: "1942", imdb: "https://www.imdb.com/title/tt0034583/" },
    { title: "On the Town", poster: "https://image.tmdb.org/t/p/w1280/lEU8QQmIayAtPZrCDf2czQgTjQ1.jpg", year: "1949", imdb: "https://www.imdb.com/title/tt0041716/" },
    { title: "Dial M for Murder", poster: "https://image.tmdb.org/t/p/w1280/4KKiFDvtEusJzqzlwHp7iMceXKS.jpg", year: "1954", imdb: "https://www.imdb.com/title/tt0046912/" },
    { title: "Guys and Dolls", poster: "https://image.tmdb.org/t/p/w1280/mrSM6laJJLBVdMdWfeNRa1innnk.jpg", year: "1955", imdb: "https://www.imdb.com/title/tt0048140/" },
    { title: "Ben-Hur", poster: "https://image.tmdb.org/t/p/w1280/m4WQ1dBIrEIHZNCoAjdpxwSKWyH.jpg", year: "1959", imdb: "https://www.imdb.com/title/tt0052618/" },
    { title: "Psycho", poster: "https://image.tmdb.org/t/p/w1280/yz4QVqPx3h1hD1DfqqQkCq3rmxW.jpg", year: "1960", imdb: "https://www.imdb.com/title/tt0054215/" },
    { title: "Lawrence of Arabia", poster: "https://image.tmdb.org/t/p/w1280/AiAm0EtDvyGqNpVoieRw4u65vD1.jpg", year: "1962", imdb: "https://www.imdb.com/title/tt0056172/" },
    { title: "The Godfather", poster: "https://image.tmdb.org/t/p/w1280/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", year: "1972", imdb: "https://www.imdb.com/title/tt0068646/" },
    { title: "The Sting", poster: "https://image.tmdb.org/t/p/w1280/ckmYng37zey8INYf6d10cVgIG93.jpg", year: "1973", imdb: "https://www.imdb.com/title/tt0070735/" },
    { title: "Footloose", poster: "https://image.tmdb.org/t/p/w1280/9JEDjBCXCx3eKTSkXwispf0UN3O.jpg", year: "1984", imdb: "https://www.imdb.com/title/tt0087277/" },
    { title: "Clue", poster: "https://image.tmdb.org/t/p/w1280/aRxbYOYHS8T73nzR8hsLousoplR.jpg", year: "1985", imdb: "https://www.imdb.com/title/tt0088930/" },
    { title: "Top Gun", poster: "https://image.tmdb.org/t/p/w1280/xUuHj3CgmZQ9P2cMaqQs4J0d4Zc.jpg", year: "1986", imdb: "https://www.imdb.com/title/tt0092099/" },
    { title: "Weekend at Bernie's", poster: "https://image.tmdb.org/t/p/w1280/4RtjBkBSqHG46uieHgTtM7oKlpo.jpg", year: "1989", imdb: "https://www.imdb.com/title/tt0098627/" },
    { title: "The Bodyguard", poster: "https://image.tmdb.org/t/p/w1280/ihWF0uY1xnKqw9YK7ZHNLUZOhcO.jpg", year: "1992", imdb: "https://www.imdb.com/title/tt0103855/" },
    { title: "A Few Good Men", poster: "https://image.tmdb.org/t/p/w1280/rLOk4z9zL1tTukIYV56P94aZXKk.jpg", year: "1992", imdb: "https://www.imdb.com/title/tt0104257/" },
    { title: "In the Line of Fire", poster: "https://image.tmdb.org/t/p/w1280/3NvOFpmyECI3DNExYMtFIRcGMsu.jpg", year: "1993", imdb: "https://www.imdb.com/title/tt0107206/" },
    { title: "The Firm", poster: "https://image.tmdb.org/t/p/w1280/kFexXCzidkm4LwlgZqxsJsDQB5v.jpg", year: "1993", imdb: "https://www.imdb.com/title/tt0106918/" },
    { title: "The Fugitive", poster: "https://image.tmdb.org/t/p/w1280/b3rEtLKyOnF89mcK75GXDXdmOEf.jpg", year: "1993", imdb: "https://www.imdb.com/title/tt0106977/" },
    { title: "The Pelican Brief", poster: "https://image.tmdb.org/t/p/w1280/7B1HS0SqfJR1jbeHS6V0ZWdzLXP.jpg", year: "1993", imdb: "https://www.imdb.com/title/tt0107798/" },
    { title: "True Lies", poster: "https://image.tmdb.org/t/p/w1280/pweFTnzzTfGK68woSVkiTgjLzWm.jpg", year: "1994", imdb: "https://www.imdb.com/title/tt0111503/" },
    { title: "Legends of the Fall", poster: "https://image.tmdb.org/t/p/w1280/t1KPGlW0UGd0m515LPQmk2F4nu1.jpg", year: "1994", imdb: "https://www.imdb.com/title/tt0110322/" },
    { title: "Apollo 13", poster: "https://image.tmdb.org/t/p/w1280/tVeKscCm2fY1xDXZk8PgnZ87h9S.jpg", year: "1995", imdb: "https://www.imdb.com/title/tt0112384/" },
    { title: "Braveheart", poster: "https://image.tmdb.org/t/p/w1280/or1gBugydmjToAEq7OZY0owwFk.jpg", year: "1995", imdb: "https://www.imdb.com/title/tt0112573/" },
    { title: "First Knight", poster: "https://image.tmdb.org/t/p/w1280/dJH5bwtu3UxbwRsSlhlhmMrV8ZH.jpg", year: "1995", imdb: "https://www.imdb.com/title/tt0113071/" },
    { title: "GoldenEye", poster: "https://m.media-amazon.com/images/M/MV5BOGQxNmYyY2YtZGIyNy00ODgxLThhZWEtZGIyNjJhYzFlOTllXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", year: "1995", imdb: "https://www.imdb.com/title/tt0113189/" },
    { title: "Tommy Boy", poster: "https://image.tmdb.org/t/p/w1280/jeEM8v1OA9u6F5NC2lzXD04Ls1U.jpg", year: "1995", imdb: "https://www.imdb.com/title/tt0114694/" },
    { title: "The Usual Suspects", poster: "https://image.tmdb.org/t/p/w1280/99X2SgyFunJFXGAYnDv3sb9pnUD.jpg", year: "1995", imdb: "https://www.imdb.com/title/tt0114814/" },
    { title: "Fear", poster: "https://image.tmdb.org/t/p/w1280/ut8snuINzOibbKnvpTnsGWQr4Nl.jpg", year: "1996", imdb: "https://www.imdb.com/title/tt0116287/" },
    { title: "Jerry Maguire", poster: "https://image.tmdb.org/t/p/w1280/lABvGN7fDk5ifnwZoxij6G96t2w.jpg", year: "1996", imdb: "https://www.imdb.com/title/tt0116695/" },
    { title: "Romeo + Juliet", poster: "https://image.tmdb.org/t/p/w1280/eLf4jclPijOqfEp6bDAmezRFxk5.jpg", year: "1996", imdb: "https://www.imdb.com/title/tt0117509/" },
    { title: "Air Force One", poster: "https://image.tmdb.org/t/p/w1280/evO1iENjLpUnbwjnt5XK85jRYob.jpg", year: "1997", imdb: "https://www.imdb.com/title/tt0118571/" },
    { title: "Con Air", poster: "https://image.tmdb.org/t/p/w1280/kOKjgrEzGOP92rVQ6srA9jtp60l.jpg", year: "1997", imdb: "https://www.imdb.com/title/tt0118880/" },
    { title: "Titanic", poster: "https://image.tmdb.org/t/p/w1280/5bTWA20cL9LCIGNpde4Epc2Ijzn.jpg", year: "1997", imdb: "https://www.imdb.com/title/tt0120338/" },
    { title: "The Mask of Zorro", poster: "https://image.tmdb.org/t/p/w1280/bdMufwGDDzqu4kTSQwrKc5WR4bu.jpg", year: "1998", imdb: "https://www.imdb.com/title/tt0120746/" },
    { title: "Meet Joe Black", poster: "https://image.tmdb.org/t/p/w1280/fDPAjvfPMomkKF7cMRmL5Anak61.jpg", year: "1998", imdb: "https://www.imdb.com/title/tt0119643/" },
    { title: "A Perfect Murder", poster: "https://image.tmdb.org/t/p/w1280/wC0ax12N9GQ8vMXPEs4nES5AAiB.jpg", year: "1998", imdb: "https://www.imdb.com/title/tt0120787/" },
    { title: "Charlie's Angels", poster: "https://image.tmdb.org/t/p/w1280/iHTmZs0BmkwMCYi8rhvMWC5G4EM.jpg", year: "2000", imdb: "https://www.imdb.com/title/tt0160127/" },
    { title: "What Lies Beneath", poster: "https://image.tmdb.org/t/p/w1280/2L3Cn0CizbSy2E9KJt1SiOSyb6p.jpg", year: "2000", imdb: "https://www.imdb.com/title/tt0161081/" },
    { title: "Moulin Rouge!", poster: "https://image.tmdb.org/t/p/w1280/2kjM5CUZRIU5yOANUowrbJcRL9L.jpg", year: "2001", imdb: "https://www.imdb.com/title/tt0203009/" },
    { title: "Pearl Harbor", poster: "https://image.tmdb.org/t/p/w1280/y8A0Cvp8WQmZ3bjbnsL53lY0dsC.jpg", year: "2001", imdb: "https://www.imdb.com/title/tt0213149/" },
    { title: "Chicago", poster: "https://image.tmdb.org/t/p/w1280/3ED8cWCXY9zkx77Sd0N5qMbsdDP.jpg", year: "2002", imdb: "https://www.imdb.com/title/tt0299658/" },
    { title: "Drumline", poster: "https://image.tmdb.org/t/p/w1280/zl7gdxYqKdFCioPT3DAkZR5DDUP.jpg", year: "2002", imdb: "https://www.imdb.com/title/tt0303933/" },
    { title: "Sweet Home Alabama", poster: "https://image.tmdb.org/t/p/w1280/698cbxq0SRwCdOPG5Bwi7JDk12d.jpg", year: "2002", imdb: "https://www.imdb.com/title/tt0256415/" },
    { title: "The Pianist", poster: "https://image.tmdb.org/t/p/w1280/2hFvxCCWrTmCYwfy7yum0GKRi3Y.jpg", year: "2002", imdb: "https://www.imdb.com/title/tt0253474/" },
    { title: "13 Going on 30", poster: "https://image.tmdb.org/t/p/w1280/iNZdSIfhSCMtRILDNyhLn8UKeSG.jpg", year: "2004", imdb: "https://www.imdb.com/title/tt0337563/" },
    { title: "Friday Night Lights", poster: "https://image.tmdb.org/t/p/w1280/8HIqpOgqShRc3TAleabnYispDl1.jpg", year: "2004", imdb: "https://www.imdb.com/title/tt0390022/" },
    { title: "Pride & Prejudice", poster: "https://image.tmdb.org/t/p/w1280/o8UhmEbWPHmTUxP0lMuCoqNkbB3.jpg", year: "2005", imdb: "https://www.imdb.com/title/tt0414387/" },
    { title: "Blood Diamond", poster: "https://image.tmdb.org/t/p/w1280/bqKNoySmI4eOjsSjJEnLj4j2HAp.jpg", year: "2006", imdb: "https://www.imdb.com/title/tt0450259/" },
    { title: "3:10 To Yuma", poster: "https://image.tmdb.org/t/p/w1280/voMB69AsLnPNmtfbrBl0lbeFKDH.jpg", year: "2007", imdb: "https://www.imdb.com/title/tt0381849/" },
    { title: "Body of Lies", poster: "https://image.tmdb.org/t/p/w1280/rNEZug6er0bIj9LVN2JaQig6oZy.jpg", year: "2008", imdb: "https://www.imdb.com/title/tt0758774/" },
    { title: "The Proposal", poster: "https://image.tmdb.org/t/p/w1280/6stnAm1wSek8ZrislwK4xGTyCnt.jpg", year: "2009", imdb: "https://www.imdb.com/title/tt1041829/" },
    { title: "Green Zone", poster: "https://image.tmdb.org/t/p/w1280/czFIaeukSxNEccysQeys1PCkuOG.jpg", year: "2010", imdb: "https://www.imdb.com/title/tt0947810/" },
    { title: "Knight and Day", poster: "https://image.tmdb.org/t/p/w1280/a7JmOBMNj5erYTgt4u1mQgvHItu.jpg", year: "2010", imdb: "https://www.imdb.com/title/tt1013743/" },
    { title: "Argo", poster: "https://image.tmdb.org/t/p/w1280/m5gPWFZFIp4UJFABgWyLkbXv8GX.jpg", year: "2012", imdb: "https://www.imdb.com/title/tt1024648/" },
    { title: "Lawless", poster: "https://image.tmdb.org/t/p/w1280/Ahtzwts22ayviD3LEVslfL4nRWB.jpg", year: "2012", imdb: "https://www.imdb.com/title/tt1212450/" },
    { title: "Captain Phillips", poster: "https://image.tmdb.org/t/p/w1280/8Td0kkocW6sD3uRpzwfMfkqMWhx.jpg", year: "2013", imdb: "https://www.imdb.com/title/tt1535109/" },
    { title: "Now You See Me", poster: "https://image.tmdb.org/t/p/w1280/tWsNYbrqy1p1w6K9zRk0mSchztT.jpg", year: "2013", imdb: "https://www.imdb.com/title/tt1670345/" },
    { title: "Olympus Has Fallen", poster: "https://image.tmdb.org/t/p/w1280/u3GTFGwesNBNd0t1hiLaEk1iqZU.jpg", year: "2013", imdb: "https://www.imdb.com/title/tt2302755/" },
    { title: "Keeping Up with the Joneses", poster: "https://image.tmdb.org/t/p/w1280/yvWcTrRCzE4C2hkd2wV4erPuKCn.jpg", year: "2016", imdb: "https://www.imdb.com/title/tt2387499/" },
    { title: "Passengers", poster: "https://image.tmdb.org/t/p/w1280/jK9S6HANSf2no64v1x1HxfcpmcA.jpg", year: "2016", imdb: "https://www.imdb.com/title/tt1355644/" },
    { title: "Ocean's Eight", poster: "https://image.tmdb.org/t/p/w1280/MvYpKlpFukTivnlBhizGbkAe3v.jpg", year: "2018", imdb: "https://www.imdb.com/title/tt5164214/" },
    { title: "1917", poster: "https://image.tmdb.org/t/p/w1280/iZf0KyrE25z1sage4SYFLCCrMi9.jpg", year: "2019", imdb: "https://www.imdb.com/title/tt8579674/" },
    { title: "The Lost City", poster: "https://image.tmdb.org/t/p/w1280/rnheO8cFvCYcmZsDrBoabJbKLFE.jpg", year: "2022", imdb: "https://www.imdb.com/title/tt13320622/" }
];

// --- Styles ---
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
    
    .movie-card {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .movie-card:hover {
        border-color: #3b82f6;
        transform: translateY(-2px);
        background-color: #1e293b;
    }
    .fade-in {
        animation: fadeIn 0.4s ease-out forwards;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .progress-bar {
        transition: width 0.4s ease-in-out;
    }
    .action-btn {
        transition: all 0.2s;
    }
    .action-btn:active {
        transform: scale(0.98);
    }
    .setup-card:hover {
        border-color: #3b82f6;
        background-color: #1e293b;
    }
`;

export default function App() {
    const [view, setView] = useState('start'); // 'start', 'game', 'interstitial', 'winner'
    const [state, setState] = useState({
        currentRound: [],
        winnersOfRound: [],
        matchIndex: 0,
        roundNumber: 1,
        totalRounds: 1
    });

    const [winner, setWinner] = useState(null);

    // Helpers
    const shuffle = (array) => {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    };

    const calculateTotalRounds = (count) => {
        let rounds = 0;
        let current = count;
        while (current > 1) {
            current = Math.ceil(current / 2);
            rounds++;
        }
        return rounds;
    };

    const startGame = (mode) => {
        let selectedMovies = shuffle(MOVIE_DATA);
        if (mode !== 'full') {
            selectedMovies = selectedMovies.slice(0, mode);
        }

        setState({
            currentRound: selectedMovies,
            winnersOfRound: [],
            matchIndex: 0,
            roundNumber: 1,
            totalRounds: calculateTotalRounds(selectedMovies.length)
        });
        setView('game');
        setWinner(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const pickInstantRandom = () => {
        const random = MOVIE_DATA[Math.floor(Math.random() * MOVIE_DATA.length)];
        setWinner(random);
        setView('winner');
        triggerConfetti();
    };

    const triggerConfetti = () => {
        if (window.confetti) {
            window.confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#3b82f6', '#10b981', '#fbbf24']
            });
        }
    };

    const vote = (movieObj) => {
        const nextWinners = [...state.winnersOfRound, movieObj];
        const nextMatchIndex = state.matchIndex + 1;
        const totalMatchesInRound = Math.floor(state.currentRound.length / 2);

        if (nextMatchIndex >= totalMatchesInRound) {
            // End of round
            let finalWinners = nextWinners;
            if (state.currentRound.length % 2 !== 0) {
                finalWinners.push(state.currentRound[state.currentRound.length - 1]);
            }

            if (finalWinners.length === 1) {
                setWinner(finalWinners[0]);
                setView('winner');
                triggerConfetti();
            } else {
                setState(prev => ({
                    ...prev,
                    winnersOfRound: finalWinners
                }));
                setView('interstitial');
            }
        } else {
            setState(prev => ({
                ...prev,
                winnersOfRound: nextWinners,
                matchIndex: nextMatchIndex
            }));
        }
    };

    const startNextRound = () => {
        setState(prev => ({
            currentRound: prev.winnersOfRound,
            winnersOfRound: [],
            matchIndex: 0,
            roundNumber: prev.roundNumber + 1,
            totalRounds: prev.totalRounds
        }));
        setView('game');
    };

    const resetToStart = () => {
        setView('start');
        setWinner(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Sub-components for matching original look and feel
    const MovieCard = ({ movie, onPick }) => (
        <div className="movie-card flex bg-slate-800/40 rounded-xl border border-slate-700 overflow-hidden h-40 md:h-48">
            <div className="w-28 md:w-32 flex-shrink-0 bg-slate-900">
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" 
                     onError={(e) => { e.target.src='https://via.placeholder.com/200x300/1e293b/ffffff?text=?'; }} />
            </div>
            <div className="flex-grow p-4 md:p-6 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg md:text-xl font-bold leading-tight line-clamp-2 text-white">{movie.title}</h3>
                    <p className="text-slate-400 font-medium text-sm mt-1">{movie.year}</p>
                </div>
                <div className="flex items-center gap-3 mt-auto">
                    <a href={movie.imdb} target="_blank" rel="noreferrer" className="action-btn px-4 py-2 bg-black border border-[#f5c518] text-[#f5c518] hover:bg-[#f5c518]/10 font-black rounded-lg text-[10px] uppercase tracking-wider shadow-lg text-center">
                        IMDb
                    </a>
                    <button onClick={onPick} className="action-btn px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs uppercase tracking-wider shadow-lg flex-grow">
                        Pick
                    </button>
                </div>
            </div>
        </div>
    );

    const totalMatchesInRound = Math.floor(state.currentRound.length / 2);
    const progress = (state.matchIndex / totalMatchesInRound) * 100;
    const movie1 = state.currentRound[state.matchIndex * 2];
    const movie2 = state.currentRound[state.matchIndex * 2 + 1];

    return (
        <div className="min-h-screen bg-[#0f172a] text-[#f5f9f9] p-4 md:p-8 font-['Inter']">
            <style>{styles}</style>
            
            <div className="max-w-2xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent uppercase tracking-tight">
                        Pick A Movie
                    </h1>
                    <div className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                        {view === 'start' ? "The bracket tournament movie picker" : 
                         view === 'winner' ? "Winner Found" : `Round ${state.roundNumber} of ${state.totalRounds}`}
                    </div>
                </header>

                {/* Start Screen */}
                {view === 'start' && (
                    <div className="fade-in">
                        <div className="space-y-4 mb-12">
                            <div className="text-center mb-8">
                                <p className="text-slate-400">Choose your tournament size to begin.</p>
                            </div>
                            
                            <button onClick={() => startGame('full')} className="setup-card w-full text-left p-6 rounded-2xl bg-slate-800/40 border border-slate-700 transition-all group">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors text-white">All 64</h3>
                                        <p className="text-slate-400 text-sm mt-1">Include all {MOVIE_DATA.length} movies. {calculateTotalRounds(MOVIE_DATA.length)} rounds of voting.</p>
                                    </div>
                                    <div className="text-blue-500 font-black text-2xl">→</div>
                                </div>
                            </button>

                            <button onClick={() => startGame(32)} className="setup-card w-full text-left p-6 rounded-2xl bg-slate-800/40 border border-slate-700 transition-all group">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors text-white">Quick 32</h3>
                                        <p className="text-slate-400 text-sm mt-1">Start with 32 randomly selected movies. 5 rounds of voting.</p>
                                    </div>
                                    <div className="text-blue-500 font-black text-2xl">→</div>
                                </div>
                            </button>

                            <button onClick={() => startGame(16)} className="setup-card w-full text-left p-6 rounded-2xl bg-slate-800/40 border border-slate-700 transition-all group">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors text-white">Sweet 16</h3>
                                        <p className="text-slate-400 text-sm mt-1">Start with 16 randomly selected movies. 4 rounds of voting.</p>
                                    </div>
                                    <div className="text-blue-500 font-black text-2xl">→</div>
                                </div>
                            </button>
                        </div>

                        {/* Pick For Me Section */}
                        <div className="space-y-4 mb-12">
                            <div className="border-t border-slate-800 pt-10 pb-10">
                                <h2 className="text-xl font-extrabold text-slate-200 mb-6 uppercase tracking-widest text-center">Pick a random movie for me</h2>
                                <button onClick={pickInstantRandom} className="setup-card w-full text-left p-6 rounded-2xl bg-slate-800/40 border border-slate-700 transition-all group">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors text-white">Pick one for me.</h3>
                                            <p className="text-slate-400 text-sm mt-1">Pick a random movie for me. Skip the tournament.</p>
                                        </div>
                                        <div className="text-blue-500 font-black text-2xl">→</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Full List Section */}
                        <div className="border-t border-slate-800 pt-10 pb-20">
                            <h2 className="text-xl font-extrabold text-slate-200 mb-6 uppercase tracking-widest text-center">All {MOVIE_DATA.length} movies</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 opacity-80">
                                {[...MOVIE_DATA].sort((a,b) => a.title.localeCompare(b.title)).map((movie, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-2 bg-slate-800/20 rounded-lg border border-slate-800/50">
                                        <img src={movie.poster} alt="" className="w-8 h-10 object-cover rounded shadow" onError={(e) => { e.target.src='https://via.placeholder.com/30x40/1e293b/ffffff?text=?'; }} />
                                        <div className="overflow-hidden">
                                            <div className="text-[11px] font-bold text-slate-200 truncate">{movie.title}</div>
                                            <div className="text-[9px] text-slate-500">{movie.year}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Game UI */}
                {view === 'game' && (
                    <div className="fade-in">
                        <div className="mb-8">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mb-2 px-1 tracking-wider">
                                <span>Match {state.matchIndex + 1} / {totalMatchesInRound}</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
                                <div className="progress-bar bg-blue-500 h-full transition-all" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className="text-center text-lg font-medium text-slate-200">
                                Which would you rather watch?
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <MovieCard movie={movie1} onPick={() => vote(movie1)} />
                                <div className="flex items-center gap-4">
                                    <div className="flex-grow h-[1px] bg-slate-800"></div>
                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">OR</span>
                                    <div className="flex-grow h-[1px] bg-slate-800"></div>
                                </div>
                                <MovieCard movie={movie2} onPick={() => vote(movie2)} />
                            </div>
                            
                            <div className="flex justify-center pt-4">
                                <button 
                                    onClick={() => vote(Math.random() < 0.5 ? movie1 : movie2)}
                                    className="action-btn bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-6 py-2.5 rounded-lg border border-slate-700 text-xs font-bold uppercase tracking-widest"
                                >
                                    I can't decide! Pick for me
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Round Interstitial */}
                {view === 'interstitial' && (
                    <div className="text-center fade-in py-12">
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 mb-6 border border-emerald-500/30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-black text-white mb-3">Round Complete!</h2>
                            <p className="text-slate-400 max-w-sm mx-auto text-lg leading-relaxed">
                                Round {state.roundNumber} complete! {state.winnersOfRound.length} movies remaining.
                            </p>
                        </div>
                        <button onClick={startNextRound} className="action-btn bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-4 rounded-xl font-extrabold text-lg shadow-xl shadow-emerald-900/20 flex items-center gap-3 mx-auto">
                            Start Next Round
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Winner View */}
                {view === 'winner' && winner && (
                    <div className="text-center fade-in py-8">
                        <div className="text-emerald-400 font-bold mb-6 uppercase tracking-[0.2em] text-[10px]">Tournament Champion</div>
                        <div className="mb-10">
                            <div className="bg-slate-800/50 rounded-2xl border-2 border-emerald-500/30 overflow-hidden flex flex-col items-center p-6 max-w-xs mx-auto shadow-2xl">
                                <img src={winner.poster} alt="" className="w-48 h-auto rounded-lg shadow-xl mb-6 border border-slate-700" 
                                     onError={(e) => { e.target.src='https://via.placeholder.com/300x450/1e293b/ffffff?text=?'; }} />
                                <h2 className="text-2xl font-black text-white text-center leading-tight mb-2">{winner.title}</h2>
                                <p className="text-slate-400 font-bold mb-6">{winner.year}</p>
                                <a href={winner.imdb} target="_blank" rel="noreferrer" className="action-btn px-8 py-3 bg-black border border-[#f5c518] text-[#f5c518] hover:bg-[#f5c518]/10 font-black rounded-lg text-sm uppercase tracking-wider shadow-lg">IMDB</a>
                            </div>
                        </div>
                        <button onClick={resetToStart} className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-3 rounded-full font-bold transition-all shadow-lg shadow-blue-900/20">
                            New Tournament
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
