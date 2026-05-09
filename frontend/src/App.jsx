import React from 'react';
import { Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeEdit from './components/RecipeEdit';

function App() {
  return (
      <div className="min-h-screen bg-gray-200">
        
        <Navbar />
        <main className="container mx-auto px-9 py-8">
        <div className="flex justify-center">
        <a to="/" className="text-black text-4xl font-bold text-center">Smart Recipe Sharing and Management System</a>
        <br /><br /> <br />
        </div>
          <Routes>
            
            <Route path="/" element={<RecipeList />} />
            <Route path="/create" element={<RecipeForm />} />
            <Route path="/edit/:id" element={<RecipeEdit />} />
          </Routes>
          
        </main>
      </div>
  );
}

export default App;