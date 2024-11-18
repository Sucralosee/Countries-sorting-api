"use client";
import { useState, useEffect } from 'react';
import Countries from './components/Countries';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [activeContinent, setActiveContinent] = useState('');
  const [activeSubregion, setActiveSubregion] = useState('');
  const [sortType, setSortType] = useState('name');
  const [showTop10, setShowTop10] = useState('');

  const continents = [...new Set(countries.flatMap(country => country.continents))].sort();
  const subregions = [...new Set(countries.filter(c => c.subregion).map(country => country.subregion))].sort();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...countries];

    // erm fro continent
    if (activeContinent) {
      filtered = filtered.filter(country => 
        country.continents.includes(activeContinent)
      );
    }

    if (activeSubregion) {
      filtered = filtered.filter(country => 
        country.subregion === activeSubregion
      );
    }

    switch (sortType) {
      case 'name':
        filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
        break;
      case 'population':
        filtered.sort((a, b) => b.population - a.population);
        break;
      case 'area':
        filtered.sort((a, b) => b.area - a.area);
        break;
      default:
        break;

    }

    if (showTop10) {
      filtered = filtered.slice(0, 10);
    }

    setFilteredCountries(filtered);
  }, [countries, activeContinent, activeSubregion, sortType, showTop10]);

  const handleContinentChange = (continent) => {
    setActiveContinent(continent);
    setActiveSubregion(''); //clears array
  };

  const handleSubregionChange = (subregion) => {
    setActiveSubregion(subregion);
    setActiveContinent('');  //clears array
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Countries of the World</h1>
      <h2 className="text-1xl font-bold mb-8 text-center text-white">Ben Louis - COMPT 3170</h2>
      
      <div className="mb-8 space-y-4">
        <div className="flex flex-wrap gap-4">
          
          <select 
            className="p-2 border rounded-md bg-gray-800 text-white"
            value={activeContinent}
            onChange={(e) => handleContinentChange(e.target.value)}
          >
            <option value="" className="text-white">All Continents</option>
            {continents.map(continent => (
              <option key={continent} value={continent} className="text-white">
                {continent}
              </option>
            ))}
          </select>

          <select 
            className="p-2 border rounded-md bg-gray-800 text-white"
            value={activeSubregion}
            onChange={(e) => handleSubregionChange(e.target.value)}
          >
            <option value="" className="text-white">All Subregions</option>
            {subregions.map(subregion => (
              <option key={subregion} value={subregion} className="text-white">
                {subregion}
              </option>
            ))}
          </select>

          <select 
            className="p-2 border rounded-md bg-gray-800 text-white"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="name" className="text-white">Sort by Name - Alphabetical</option>
            <option value="population" className="text-white">Sort by Population</option>
            <option value="area" className="text-white">Sort by Area</option>
          </select>

          <select 
            className="p-2 border rounded-md bg-gray-800 text-white"
            value={showTop10}
            onChange={(e) => setShowTop10(e.target.value)}
            >
              <option value="" className="text-white">Show All</option>
              <option value="population" className="text-white">Top 10 by Population</option>
              <option value="area" className="text-white">Top 10 by Area</option>
            </select>
          </div>

          <div className="text-sm text-gray-400">
            Showing {filteredCountries.length} countries
          </div>
      </div>

      <Countries countries={filteredCountries} />
    </div>
  );
}