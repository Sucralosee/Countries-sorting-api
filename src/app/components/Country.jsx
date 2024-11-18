"use client";
import Image from "next/image";

const Country = ({ country }) => {
  return (
    <div className="p-6 rounded-lg bg-gray-900 border border-gray-600 hover:border-indigo-500 hover:border-4">
      <div className="relative w-full h-40 mb-4">
        <Image 
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-100">{country.name.common}</h3>
      <div className="space-y-2 text-sm text-gray-300">
        <p><span className="font-medium text-gray-100">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
        <p><span className="font-medium text-gray-100">Population:</span> {country.population.toLocaleString()}</p>
        <p><span className="font-medium text-gray-100">Area:</span> {country.area.toLocaleString()} km²</p>
        <p><span className="font-medium text-gray-100">Continent:</span> {country.continents.join(', ')}</p>
        <p><span className="font-medium text-gray-100">Sub-region:</span> {country.subregion || 'N/A'}</p>
      </div>
    </div>
  );
};

export default Country;