import React, { useState, useMemo, useEffect, useRef } from 'react';

// --- Helper Functions & Mock Data ---

const generateId = () => `id_${Math.random().toString(36).substr(2, 9)}`;

const initialMovies = [
  {
    id: generateId(),
    title: 'War 2',
    genre: 'Action',
    languages: ['Hindi', 'Telugu', 'Tamil'],
    duration: '2h 45m',
    rating: 4.8,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/War_2_official_poster.jpg/250px-War_2_official_poster.jpg',
    showtimes: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM'],
    trailerUrl: 'https://www.youtube.com/embed/your_trailer_id_for_war2',
  },
  {
    id: generateId(),
    title: 'Coolie',
    genre: 'Action',
    languages: ['Tamil', 'Telugu'],
    duration: '2h 30m',
    rating: 4.9,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/Coolie_%282025_film%29_poster.jpg/250px-Coolie_%282025_film%29_poster.jpg',
    showtimes: ['11:00 AM', '2:15 PM', '6:00 PM', '9:15 PM'],
    trailerUrl: 'https://www.youtube.com/embed/your_trailer_id_for_coolie',
  },
  {
    id: generateId(),
    title: 'Saiyaara',
    genre: 'Romance',
    languages: ['Hindi'],
    duration: '2h 20m',
    rating: 4.5,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Saiyaara_film_poster.jpg/250px-Saiyaara_film_poster.jpg',
    showtimes: ['12:30 PM', '3:45 PM', '7:15 PM', '10:00 PM'],
    trailerUrl: 'https://www.youtube.com/embed/9r-tT5IN0vg',
  },
  {
    id: generateId(),
    title: 'Deadpool & Wolverine',
    genre: 'Action',
    languages: ['English'],
    duration: '2h 7m',
    rating: 4.9,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Deadpool_%26_Wolverine_poster.jpg',
    showtimes: ['11:00 AM', '2:15 PM', '6:00 PM', '9:15 PM'],
    trailerUrl: 'https://www.youtube.com/embed/u_jE7-6Uv7E',
  },
  {
    id: generateId(),
    title: 'Gladiator II',
    genre: 'Action',
    languages: ['English'],
    duration: '2h 28m',
    rating: 4.7,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Gladiator_II_%282024%29_poster.jpg/250px-Gladiator_II_%282024%29_poster.jpg',
    showtimes: ['12:30 PM', '3:45 PM', '7:15 PM', '10:00 PM'],
    trailerUrl: 'https://www.youtube.com/embed/your_trailer_id_for_gladiator2',
  },
  {
    id: generateId(),
    title: 'Wicked',
    genre: 'Fantasy',
    languages: ['English'],
    duration: '2h 30m',
    rating: 4.6,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Wicked_For_Good_poster.jpg/250px-Wicked_For_Good_poster.jpg',
    showtimes: ['10:45 AM', '2:00 PM', '5:30 PM', '9:00 PM'],
    trailerUrl: 'https://www.youtube.com/embed/your_trailer_id_for_wicked',
  },
  {
    id: generateId(),
    title: 'Inside Out 2',
    genre: 'Animation',
    languages: ['English'],
    duration: '1h 36m',
    rating: 4.8,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/Inside_Out_2_poster.jpg/250px-Inside_Out_2_poster.jpg',
    showtimes: ['10:15 AM', '12:45 PM', '3:15 PM', '6:30 PM'],
    trailerUrl: 'https://www.youtube.com/embed/your_trailer_id_for_insideout2',
  },
  {
    id: generateId(),
    title: 'Beetlejuice Beetlejuice',
    genre: 'Comedy',
    languages: ['English'],
    duration: '1h 48m',
    rating: 4.7,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Beetlejuice_Beetlejuice_poster.jpg/250px-Beetlejuice_Beetlejuice_poster.jpg',
    showtimes: ['12:00 PM', '3:00 PM', '6:45 PM', '9:45 PM'],
    trailerUrl: 'https://www.youtube.com/embed/your_trailer_id_for_beetlejuice2',
  },
];

const upcomingMovies = [
    {
        id: generateId(),
        title: 'Avatar 3',
        genre: 'Sci-Fi',
        languages: ['English'],
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/43/Avatar_Fire_and_Ash_first_poster.jpeg',
    },
    {
        id: generateId(),
        title: 'The Batman – Part II',
        genre: 'Action',
        languages: ['English'],
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f0/The_Batman_-_Part_II_logo.jpg',
    },
    {
        id: generateId(),
        title: 'SSMB 29',
        genre: 'Action, Adventure',
        languages: ['English'],
        posterUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/80/SSMB29.jpg',
    },
    {
        id: generateId(),
        title: 'Avengers: The Kang Dynasty',
        genre: 'Action',
        languages: ['English'],
        posterUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Symbol_from_Marvel%27s_The_Avengers_logo.svg/200px-Symbol_from_Marvel%27s_The_Avengers_logo.svg.png',
    },
    {
        id: generateId(),
        title: 'Toy Story 5',
        genre: 'Animation',
        languages: ['English'],
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Toy_Story_5_logo.jpg/250px-Toy_Story_5_logo.jpg',
    }
];

const initialEvents = [
  {
    id: generateId(),
    title: 'Arijit Singh Concert',
    category: 'Concerts',
    venue: 'Jio World Centre, Mumbai',
    date: 'Dec 20, 2025',
    posterUrl: 'https://placehold.co/400x600/1a202c/ffffff?text=Arijit+Singh',
    ticketOptions: ['Phase 1 GA', 'VIP', 'Fan Pit'],
  },
  {
    id: generateId(),
    title: 'Lollapalooza India',
    category: 'Concerts',
    venue: 'Mahalaxmi Race Course, Mumbai',
    date: 'Jan 18-19, 2026',
    posterUrl: 'https://placehold.co/400x600/4a2c9b/ffffff?text=Lollapalooza',
    ticketOptions: ['Early Bird', 'VIP', 'Platinum'],
  },
  {
    id: generateId(),
    title: 'ISL Final: Mumbai vs Hyderabad',
    category: 'Sports',
    venue: 'G.M.C. Balayogi Athletic Stadium, Hyderabad',
    date: 'Mar 15, 2026',
    posterUrl: 'https://placehold.co/400x600/9b2c2c/ffffff?text=ISL+Final',
    ticketOptions: ['North Stand', 'East Stand', 'VIP Box'],
  },
  {
    id: generateId(),
    title: 'India vs Australia T20',
    category: 'Sports',
    venue: 'Wankhede Stadium, Mumbai',
    date: 'Nov 22, 2025',
    posterUrl: 'https://placehold.co/400x600/2c5282/ffffff?text=IND+vs+AUS',
    ticketOptions: ['General Stand', 'Club House', 'Corporate Box'],
  },
  {
    id: generateId(),
    title: 'Kala Ghoda Arts Festival',
    category: 'Arts & Culture',
    venue: 'Kala Ghoda, Mumbai',
    date: 'Feb 1-9, 2026',
    posterUrl: 'https://placehold.co/400x600/2c5282/ffffff?text=Kala+Ghoda',
    ticketOptions: ['Day Pass', 'Workshop Ticket', 'Full Festival Pass'],
  },
   {
    id: generateId(),
    title: 'Hyderabad Literary Festival',
    category: 'Arts & Culture',
    venue: 'Hyderabad Public School, Begumpet',
    date: 'Jan 24-26, 2026',
    posterUrl: 'https://placehold.co/400x600/805ad5/ffffff?text=HLF+2026',
    ticketOptions: ['Free Entry', 'Delegate Pass', 'Author Pass'],
  },
];

const theaters = [
    'Prasads Multiplex, Hyderabad',
    'AMB Cinemas, Hyderabad',
    'PVR: Inorbit Mall, Hyderabad',
    'INOX: GVK One, Hyderabad',
    'Asian Cinemas: M Cube Mall, Hyderabad'
];


// --- React Components ---

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <svg key={i} className={`w-4 h-4 fill-current ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ));
  return <div className="flex items-center">{stars} <span className="ml-2 text-sm text-gray-500">{rating}</span></div>;
};

const MovieCard = ({ movie, onSelectItem }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transform hover:scale-105 transition-transform duration-300 cursor-pointer group" onClick={() => onSelectItem(movie)}>
    <img src={movie.posterUrl} alt={`${movie.title} Poster`} className="w-full h-96 object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x600/e2e8f0/4a5568?text=Image+Not+Found'; }} />
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800 truncate">{movie.title}</h3>
      <p className="text-sm text-gray-500 mt-1">{movie.genre}</p>
      {movie.duration && (
        <div className="flex justify-between items-center mt-3">
          <StarRating rating={movie.rating} />
          <span className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded-full">{movie.duration}</span>
        </div>
      )}
    </div>
  </div>
);

const EventCard = ({ event, onSelectItem }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 transform hover:scale-105 transition-transform duration-300 cursor-pointer group" onClick={() => onSelectItem(event)}>
    <img src={event.posterUrl} alt={`${event.title} Poster`} className="w-full h-96 object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x600/e2e8f0/4a5568?text=Image+Not+Found'; }} />
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800 truncate">{event.title}</h3>
      <p className="text-sm text-cyan-600 mt-1">{event.category}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm text-gray-700">{event.venue}</span>
        <span className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded-full">{event.date}</span>
      </div>
    </div>
  </div>
);

const ItemList = ({ items, onSelectItem, type, filters }) => {
    const filteredItems = useMemo(() => {
        if (type === 'movie') {
            return items.filter(movie => {
                const langMatch = !filters.language || movie.languages.includes(filters.language);
                const genreMatch = !filters.genre || movie.genre === filters.genre;
                return langMatch && genreMatch;
            });
        }
        if (type === 'event') {
            return items.filter(event => !filters.category || event.category === filters.category);
        }
        return items;
    }, [items, type, filters]);

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredItems.map(item => (
                    type === 'movie' 
                        ? <MovieCard key={item.id} movie={item} onSelectItem={onSelectItem} />
                        : <EventCard key={item.id} event={item} onSelectItem={onSelectItem} />
                ))}
            </div>
        </div>
    );
};

const DatePlaceSelection = ({ item, onConfirm, onBack, onWatchTrailer }) => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]);
    const [selectedPlace, setSelectedPlace] = useState(theaters[0]);
    const [selectedFormat, setSelectedFormat] = useState('2D');
    const [selectedLanguage, setSelectedLanguage] = useState(item.languages ? item.languages[0] : null);
    const [synopsis, setSynopsis] = useState('');
    const [isSynopsisLoading, setIsSynopsisLoading] = useState(false);

    const handleGetSynopsis = async () => {
        setIsSynopsisLoading(true);
        setSynopsis('');
        const prompt = `Write a short, exciting, and spoiler-free synopsis for the movie or event titled "${item.title}". Keep it under 60 words.`;
        
        try {
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = "AIzaSyAsBqoMnvKzXLIbvFxsXKK9gT2Ecw9seSY";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setSynopsis(text);
            } else {
                setSynopsis("Sorry, I couldn't get the synopsis right now.");
            }
        } catch (error) {
            console.error("Error fetching synopsis:", error);
            setSynopsis("Sorry, there was an error getting the synopsis.");
        } finally {
            setIsSynopsisLoading(false);
        }
    };

    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return date;
    });

    const isMovie = !!item.genre;

    return (
        <div className="p-4 sm:p-6 md:p-8 flex justify-center items-center min-h-[calc(100vh-80px)]">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col md:flex-row">
                <div className="md:w-1/3 relative">
                    <img src={item.posterUrl} alt={item.title} className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none" />
                    {isMovie && (
                        <button onClick={() => onWatchTrailer(item.trailerUrl)} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                        </button>
                    )}
                </div>
                <div className="md:w-2/3 p-8">
                    <h2 className="text-3xl font-bold text-gray-800">{item.title}</h2>
                    <p className="text-gray-500 mt-1">{item.genre || item.category}</p>

                    <div className="mt-4">
                        <button onClick={handleGetSynopsis} disabled={isSynopsisLoading} className="text-cyan-600 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed">
                            ✨ Tell me about this {isMovie ? 'movie' : 'event'}
                        </button>
                        {isSynopsisLoading && <p className="text-gray-500 mt-2">Getting summary...</p>}
                        {synopsis && <p className="text-gray-600 mt-2 bg-gray-100 p-3 rounded-lg">{synopsis}</p>}
                    </div>
                    
                    {isMovie && (
                        <div className="mt-6 grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Format</h3>
                                <div className="flex gap-2">
                                    <button onClick={() => setSelectedFormat('2D')} className={`w-full py-2 rounded-lg font-semibold transition-colors ${selectedFormat === '2D' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}>2D</button>
                                    <button onClick={() => setSelectedFormat('3D')} className={`w-full py-2 rounded-lg font-semibold transition-colors ${selectedFormat === '3D' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}>3D</button>
                                </div>
                            </div>
                            {item.languages && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Language</h3>
                                    <div className="flex gap-2">
                                        {item.languages.map(lang => (
                                            <button key={lang} onClick={() => setSelectedLanguage(lang)} className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${selectedLanguage === lang ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}>{lang}</button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">{isMovie ? 'Select Date' : 'Event Date'}</h3>
                        {isMovie ? (
                            <div className="flex flex-wrap gap-2">
                                {dates.map(date => {
                                    const dateString = date.toISOString().split('T')[0];
                                    const isSelected = selectedDate === dateString;
                                    return (
                                        <button key={dateString} onClick={() => setSelectedDate(dateString)}
                                            className={`px-4 py-2 rounded-lg text-sm transition-colors ${isSelected ? 'bg-cyan-500 text-white shadow' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                                            <p className="font-semibold">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                                            <p>{date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-gray-800 font-semibold bg-gray-100 p-3 rounded-lg">{item.date}</p>
                        )}
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">{isMovie ? 'Select Place' : 'Venue'}</h3>
                        {isMovie ? (
                            <select value={selectedPlace} onChange={(e) => setSelectedPlace(e.target.value)} className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                {theaters.map(theater => <option key={theater} value={theater}>{theater}</option>)}
                            </select>
                        ) : (
                             <p className="text-gray-800 font-semibold bg-gray-100 p-3 rounded-lg">{item.venue}</p>
                        )}
                    </div>
                    
                    <div className="mt-8 flex gap-4">
                        <button onClick={onBack} className="w-1/3 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors">Back</button>
                        <button onClick={() => onConfirm(isMovie ? selectedDate : item.date, isMovie ? selectedPlace : item.venue, isMovie ? selectedFormat : null, isMovie ? selectedLanguage : null)} className="w-2/3 bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-600 transition-colors shadow-lg">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Seat = ({ id, status, onSelect, isRecommended, type = 'standard' }) => {
  const getSeatClasses = () => {
    let baseClass = 'flex items-center justify-center font-bold text-xs transition-colors duration-200 cursor-pointer';
    let sizeClass = type === 'sofa' ? 'w-16 h-7 rounded-md' : 'w-6 h-6 sm:w-7 sm:h-7 rounded-t-md';
    
    switch (status) {
      case 'available':
        const colorClass = isRecommended 
          ? 'bg-green-700 hover:bg-blue-500' // Dark Green for recommended
          : 'bg-green-400 hover:bg-blue-500'; // Light Green for non-recommended
        return `${baseClass} ${sizeClass} ${colorClass} text-transparent`;
      case 'selected':
        return `${baseClass} ${sizeClass} bg-blue-500 text-white shadow-lg shadow-blue-500/50`; // Blue for selected
      case 'occupied':
        return `${baseClass} ${sizeClass} bg-gray-400 cursor-not-allowed`; // Grey for occupied
      default:
        return 'w-6 h-6 sm:w-7 sm:h-7';
    }
  };
  
  const tooltipText = type === 'sofa' ? `Sofa (${id})` : `Seat ${id}`;

  return <div title={tooltipText} className={getSeatClasses()} onClick={status === 'available' || status === 'selected' ? onSelect : null}>{status === 'selected' && '✓'}</div>;
};

const SeatSelection = ({ item, bookingOptions, onBookingConfirm }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const seatData = useMemo(() => {
        const layout = [
            { name: 'Silver', price: 12.50, type: 'standard', rows: [
                { seats: [1,1,1,1,1,1, 0, 1,1,1,1,1,1, 0, 1,1,1,1,1,1] },
                { seats: [1,1,1,1,1,1, 0, 1,1,1,1,1,1, 0, 1,1,1,1,1,1] },
                { seats: [1,1,1,1,1,1, 0, 1,1,1,1,1,1, 0, 1,1,1,1,1,1] },
                { seats: [1,1,1,1,1,1, 0, 1,1,1,1,1,1, 0, 1,1,1,1,1,1] },
            ]},
            { name: 'Gold', price: 18.50, type: 'standard', rows: [
                { seats: [1,1,1,1,1,1, 0, 1,1,1,1,1,1, 0, 1,1,1,1,1,1] },
                { seats: [1,1,1,1,1,1, 0, 1,1,1,1,1,1, 0, 1,1,1,1,1,1] },
                { seats: [1,1,1,1,1,1, 0, 1,1,1,1,1,1, 0, 1,1,1,1,1,1] },
                { seats: [1,1,1,1,1,1, 0, 1,1,1,1,1,1, 0, 1,1,1,1,1,1] },
                { seats: [1,1,1,1,1,1, 0, 1,1,1,1,1,1, 0, 1,1,1,1,1,1] },
                { seats: [1,1,1,1,1,1, 0, 1,1,1,1,1,1, 0, 1,1,1,1,1,1] },
            ]},
            { name: 'Premium', price: 25.00, sofaPrice: 35.00, rows: [
                { seats: [1,1,1,1, 0, 1,1,1,1,1,1, 0, 1,1,1,1] },
                { seats: [1,1,1,1, 0, 1,1,1,1,1,1, 0, 1,1,1,1] },
                { seats: [1,1,1,1, 0, 1,1,1,1,1,1, 0, 1,1,1,1] },
                { seats: [1,1,1,1, 0, 1,1,1,1,1,1, 0, 1,1,1,1] },
                { seats: [1,1,1,1, 0, 1,1,1,1,1,1, 0, 1,1,1,1] },
            ]},
        ];

        let seatCounter = 0;
        const allSeats = {};
        const populatedLayout = layout.map(section => ({
            ...section,
            rows: section.rows.map(row => ({
                ...row,
                seats: row.seats.map(seatType => {
                    if (seatType === 1) {
                        seatCounter++;
                        const isSofa = section.name === 'Premium' && Math.random() < 0.25;
                        const seatId = `${isSofa ? 'Sofa' : section.name.charAt(0)}${seatCounter}`;
                        const seatInfo = { 
                            id: seatId, 
                            status: Math.random() > 0.65 ? 'occupied' : 'available',
                            price: isSofa ? section.sofaPrice : section.price,
                            type: isSofa ? 'sofa' : 'standard'
                        };
                        allSeats[seatId] = seatInfo;
                        return seatInfo;
                    }
                    return null;
                })
            }))
        }));
        
        const recommendedSeats = new Set();
        const goldSection = populatedLayout.find(s => s.name === 'Gold');
        if (goldSection) {
            goldSection.rows.slice(1, 5).forEach(row => {
                row.seats.forEach(seat => {
                    if (seat && seat.status === 'available' && seat.id.includes('G')) {
                       recommendedSeats.add(seat.id);
                    }
                });
            });
        }

        return { layout: populatedLayout, allSeats, recommendedSeats };
    }, [item.id, bookingOptions.date, bookingOptions.place]);

    const { layout, allSeats, recommendedSeats } = seatData;

    const handleSelectSeat = (seatId) => {
        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(id => id !== seatId)
                : [...prev, seatId]
        );
    };

    const totalPrice = selectedSeats.reduce((total, seatId) => total + allSeats[seatId].price, 0).toFixed(2);

    return (
        <div className="p-4 sm:p-6 md:p-8 text-gray-800">
            <div className="bg-white border border-gray-200 p-4 rounded-lg mb-6">
                <h2 className="text-2xl font-bold">{item.title} {bookingOptions.format && `(${bookingOptions.language} - ${bookingOptions.format})`}</h2>
                <p className="text-gray-500">{new Date(bookingOptions.date).toDateString()} | {bookingOptions.place}</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-full max-w-4xl bg-gray-800 text-white py-2 rounded-md mb-8"><p className="text-center tracking-widest">S C R E E N</p></div>
                
                <div className="w-full max-w-5xl space-y-6 flex flex-col mt-8">
                    {layout.map((section) => (
                        <div key={section.name}>
                             <div className="space-y-2">
                                {section.rows.map((row, rowIndex) => (
                                    <div key={rowIndex} className="flex justify-center gap-1 sm:gap-2">
                                        {row.seats.map((seat) => seat ? 
                                            <Seat key={seat.id} id={seat.id} status={selectedSeats.includes(seat.id) ? 'selected' : seat.status} onSelect={() => handleSelectSeat(seat.id)} isRecommended={recommendedSeats.has(seat.id)} type={seat.type} /> 
                                            : <div key={Math.random()} className="w-6 h-6 sm:w-7 sm:h-7 invisible"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center mt-3">
                                <div className="flex-grow border-t border-gray-200"></div>
                                <span className="text-gray-500 font-semibold px-4">{section.name}</span>
                                <div className="flex-grow border-t border-gray-200"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="flex justify-center flex-wrap gap-4 my-8">
                {[
                    { label: 'Available', color: 'bg-green-400' },
                    { label: 'Recommended', color: 'bg-green-700' },
                    { label: 'Selected', color: 'bg-blue-500' },
                    { label: 'Booked', color: 'bg-gray-400' }
                ].map(({ label, color }) => (
                    <div key={label} className="flex items-center space-x-2">
                        <div className={`w-5 h-5 rounded-t-md ${color}`}></div>
                        <span className="text-xs text-gray-600">{label}</span>
                    </div>
                ))}
            </div>

            {selectedSeats.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4 border-t border-gray-200">
                    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div>
                            <p className="text-lg font-bold text-gray-800">{selectedSeats.length} Ticket(s)</p>
                             <p className="text-sm text-gray-500 truncate max-w-xs">{selectedSeats.join(', ')}</p>
                        </div>
                        <div className="flex items-center gap-6">
                             <p className="text-2xl font-bold text-cyan-600">${totalPrice}</p>
                            <button onClick={() => onBookingConfirm({ item, ...bookingOptions, seats: selectedSeats, price: totalPrice })} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">Confirm Booking</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


const BookingConfirmation = ({ bookingDetails, onBack }) => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center border border-gray-200">
            <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-500 mb-6">Your tickets are ready. Enjoy the show!</p>
            <div className="text-left bg-gray-100 p-4 rounded-lg space-y-2">
                <p className="text-gray-700"><strong>{bookingDetails.item.genre ? 'Movie' : 'Event'}:</strong> {bookingDetails.item.title} {bookingDetails.format && `(${bookingDetails.language} - ${bookingDetails.format})`}</p>
                <p className="text-gray-700"><strong>Date:</strong> {new Date(bookingDetails.date).toDateString()}</p>
                <p className="text-gray-700"><strong>Place:</strong> {bookingDetails.place}</p>
                <p className="text-gray-700"><strong>Seats:</strong> {bookingDetails.seats.join(', ')}</p>
                <p className="text-gray-700"><strong>Total Price:</strong> <span className="font-bold text-cyan-600">${bookingDetails.price}</span></p>
            </div>
            <button onClick={onBack} className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg w-full transition-colors">Book Another Ticket</button>
        </div>
    </div>
);

const Chatbot = ({ isChatOpen, setIsChatOpen, movies }) => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage = { text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        const movieTitles = movies.map(m => m.title).join(', ');
        const context = `You are a helpful chatbot for a movie ticket booking website called CineVerse. The currently showing movies are: ${movieTitles}. Ticket prices are: Silver - $12.50, Gold - $18.50, Premium - $25.00, and Sofa - $35.00. Be friendly and concise.`;
        const prompt = `${context}\n\nHere is our conversation history:\n${messages.map(m => `${m.sender}: ${m.text}`).join('\n')}\nuser: ${inputValue}\nbot:`;
        
        try {
            let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = "AIzaSyAsBqoMnvKzXLIbvFxsXKK9gT2Ecw9seSY";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            
            let botResponseText = "I'm sorry, I'm having trouble connecting right now.";
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                botResponseText = result.candidates[0].content.parts[0].text;
            }
            const botMessage = { text: botResponseText, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("Error fetching bot response:", error);
            const errorMessage = { text: "Sorry, something went wrong. Please try again.", sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isChatOpen) {
        return (
            <button onClick={() => setIsChatOpen(true)} className="fixed bottom-8 right-8 bg-cyan-500 text-white p-4 rounded-full shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-110 z-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.837 8.837 0 01-4.418-1.223l-1.42.473a1 1 0 01-1.165-1.165l.473-1.42A8.837 8.837 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.418 14.182a7.003 7.003 0 0011.164 0A7.003 7.003 0 004.418 14.182zM10 5a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
            </button>
        )
    }

    return (
        <div className="fixed bottom-8 right-8 w-96 h-[32rem] bg-white rounded-xl shadow-2xl border flex flex-col transition-transform transform origin-bottom-right z-20">
            <div className="p-4 bg-gray-100 rounded-t-xl border-b flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800">✨ CineVerse Help</h3>
                <button onClick={() => setIsChatOpen(false)} className="text-gray-500 hover:text-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex flex-col gap-3">
                    {messages.map((msg, index) => (
                        <div key={index} className={`max-w-xs p-3 rounded-lg ${msg.sender === 'bot' ? 'bg-gray-200 text-gray-800 self-start' : 'bg-blue-500 text-white self-end'}`}>
                            {msg.text}
                        </div>
                    ))}
                    {isLoading && <div className="self-start bg-gray-200 text-gray-800 p-3 rounded-lg"><span className="animate-pulse">...</span></div>}
                    <div ref={chatEndRef} />
                </div>
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-gray-50 rounded-b-xl">
                <div className="flex gap-2">
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask a question..." className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                    <button type="submit" className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 font-semibold disabled:opacity-50" disabled={isLoading}>Send</button>
                </div>
            </form>
        </div>
    );
};

const TrailerModal = ({ trailerUrl, onClose }) => {
    if (!trailerUrl) return null;
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-black p-2 rounded-lg" onClick={e => e.stopPropagation()}>
                 <iframe 
                     width="853" 
                     height="480" 
                     src={trailerUrl} 
                     title="YouTube video player" 
                     frameBorder="0" 
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                     allowFullScreen
                 />
            </div>
        </div>
    )
}


function App() {
  const [currentPage, setCurrentPage] = useState('list');
  const [activeTab, setActiveTab] = useState('movies');
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookingOptions, setBookingOptions] = useState({ format: '2D', date: null, place: null, language: null });
  const [bookingDetails, setBookingDetails] = useState(null);
  const [filters, setFilters] = useState({ language: null, genre: null, category: null });
  const [view, setView] = useState('nowShowing'); // 'nowShowing' or 'upcoming'
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setCurrentPage('datePlace');
  };
  
  const handleDatePlaceConfirm = (date, place, format, language) => {
    setBookingOptions({ date, place, format, language });
    setCurrentPage('selection');
  };

  const handleBookingConfirm = (details) => {
    setBookingDetails(details);
    setCurrentPage('confirmation');
  };

  const handleBack = (toPage) => {
      setCurrentPage(toPage);
  }

  const handleBackToList = () => {
    setCurrentPage('list');
    setSelectedItem(null);
    setBookingOptions({ format: '2D', date: null, place: null, language: null });
    setBookingDetails(null);
    setView('nowShowing');
  };
  
  const TabButton = ({ tabName, title }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-6 py-2 text-lg font-semibold rounded-md transition-colors duration-300 ${activeTab === tabName ? 'bg-cyan-500 text-white' : 'text-gray-500 hover:bg-gray-200'}`}
    >
      {title}
    </button>
  );

  const FilterButton = ({ value, filterKey }) => {
      const isActive = filters[filterKey] === value;
      return (
          <button onClick={() => setFilters(prev => ({...prev, [filterKey]: isActive ? null : value}))}
            className={`px-3 py-1 border rounded-full text-sm ${isActive ? 'bg-cyan-500 text-white border-cyan-500' : 'border-gray-300 text-gray-600 hover:bg-gray-100'}`}>
              {value}
          </button>
      );
  };

  const renderPage = () => {
    switch(currentPage) {
        case 'datePlace':
            return <DatePlaceSelection item={selectedItem} onConfirm={handleDatePlaceConfirm} onBack={handleBackToList} onWatchTrailer={setTrailerUrl} />;
        case 'selection':
            return <SeatSelection item={selectedItem} bookingOptions={bookingOptions} onBookingConfirm={handleBookingConfirm} />;
        case 'confirmation':
            return <BookingConfirmation bookingDetails={bookingDetails} onBack={handleBackToList} />;
        case 'list':
        default:
            const languages = [...new Set(initialMovies.flatMap(m => m.languages))];
            const genres = [...new Set(initialMovies.map(m => m.genre))];
            const eventCategories = [...new Set(initialEvents.map(e => e.category))];
            
            if (view === 'upcoming') {
                return (
                    <>
                        <div className="p-8 flex justify-between items-center">
                            <h2 className="text-3xl font-bold text-gray-800">Upcoming Movies</h2>
                            <button onClick={() => setView('nowShowing')} className="text-cyan-600 font-semibold hover:underline">← Back to Now Showing</button>
                        </div>
                        <ItemList items={upcomingMovies} onSelectItem={() => {}} type="movie" filters={{}} />
                    </>
                )
            }

            return (
              <>
                <div className="p-4 sm:p-6 md:p-8 flex justify-center space-x-4">
                  <TabButton tabName="movies" title="Movies" />
                  <TabButton tabName="events" title="Events" />
                </div>
                {activeTab === 'movies' ? (
                    <div className="px-8 pb-8">
                        <div className="flex items-center gap-4 mb-2">
                           <h3 className="font-semibold text-gray-700">Languages:</h3>
                           {languages.map(lang => <FilterButton key={lang} value={lang} filterKey="language" />)}
                        </div>
                        <div className="flex items-center gap-4">
                           <h3 className="font-semibold text-gray-700">Genres:</h3>
                           {genres.map(genre => <FilterButton key={genre} value={genre} filterKey="genre" />)}
                        </div>
                    </div>
                ) : (
                    <div className="px-8 pb-8">
                        <div className="flex items-center gap-4 mb-2">
                           <h3 className="font-semibold text-gray-700">Categories:</h3>
                           {eventCategories.map(cat => <FilterButton key={cat} value={cat} filterKey="category" />)}
                        </div>
                    </div>
                )}
                
                {activeTab === 'movies' && (
                    <div className="px-8">
                        <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">Coming Soon</h2>
                            <button onClick={() => setView('upcoming')} className="text-cyan-600 font-semibold hover:underline">Explore Upcoming Movies &gt;</button>
                        </div>
                    </div>
                )}

                <h2 className="text-3xl font-bold text-gray-800 px-8 mt-8">{activeTab === 'movies' ? 'Now Showing' : 'Upcoming Events'}</h2>
                {activeTab === 'movies' ? (
                  <ItemList items={initialMovies} onSelectItem={handleSelectItem} type="movie" filters={filters} />
                ) : (
                  <ItemList items={initialEvents} onSelectItem={handleSelectItem} type="event" filters={filters} />
                )}
              </>
            );
    }
  };
        
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-white/80 backdrop-blur-sm p-4 sticky top-0 z-10 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 tracking-wider cursor-pointer" onClick={handleBackToList}>
            <span className="text-cyan-600">Cine</span>Verse
          </h1>
          <button onClick={() => setIsChatOpen(true)} className="text-gray-600 hover:text-gray-800">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.837 8.837 0 01-4.418-1.223l-1.42.473a1 1 0 01-1.165-1.165l.473-1.42A8.837 8.837 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.418 14.182a7.003 7.003 0 0011.164 0A7.003 7.003 0 004.418 14.182zM10 5a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </header>
      <main>{renderPage()}</main>
      <Chatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} movies={initialMovies} />
      <TrailerModal trailerUrl={trailerUrl} onClose={() => setTrailerUrl(null)} />
    </div>
  );
}

export default App;
