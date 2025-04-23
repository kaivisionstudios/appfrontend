import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await axios.get(`/api/catalog?query=${search}`);
    setResults(res.data);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Car Flipper Catalog</h1>
      <input
        className="border p-2 rounded w-full mb-4"
        type="text"
        placeholder="Search for a car..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>
      <div className="mt-6 space-y-4">
        {results.map((car, idx) => (
          <div key={idx} className="border rounded p-4">
            <h2 className="text-xl font-semibold">{car.make} {car.model} ({car.year})</h2>
            <p><strong>Avg Price:</strong> ${car.avg_price}</p>
            <p><strong>Common Issues:</strong> {car.common_issues.join(', ')}</p>
            <div className="mt-2">
              <strong>Listings:</strong>
              <ul className="list-disc ml-5">
                {car.listings.map((listing, i) => (
                  <li key={i}><a href={listing.url} target="_blank" className="text-blue-600 underline">{listing.source}</a></li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
