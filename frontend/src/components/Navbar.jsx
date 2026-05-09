import React from 'react';
import { Link } from 'react-router';

function Navbar() {
  return (
    <nav className="bg-blue-700 shadow-lg">
      <div className="container mx-auto px-10">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="text-white text-3xl font-bold" >
            Recipe Book
          </Link>

          <Link
            to="/create"
            className="bg-white text-blue-500 px-8 py-3 rounded-lg hover:bg-blue-50 text-lg"
          >
            Add Recipe
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;