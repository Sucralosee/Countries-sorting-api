"use client";
import Country from './Country';

const Countries = ({ countries }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 p-4">
      {countries.map(country => (
        <Country key={country.cca3} country={country} />
      ))}
    </div>
  );
};

export default Countries;