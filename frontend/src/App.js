import React from 'react';
import ProductForm from './pages/ProductForm';
import { BrowserRouter as Router } from 'react-router-dom';
import ApiRouter from './routes/ApiRouter'

function App() {
  return (
    <div className="App">


      <Router>
        <ApiRouter />
      </Router>
    </div>
  );
}

export default App;
