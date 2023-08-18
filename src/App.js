import './App.css';
import Home from './components/Home';

// Main App component
function App() {
  return (
    <div className="App">
      <div className="container">
          <Home /> {/* Rendering the Home component */}
      </div>
    </div>
  );
}

export default App; // Exporting the App component as the default export
