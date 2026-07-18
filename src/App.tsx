import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CameraCapture from './pages/CameraCapture';
import Customize from './pages/Customize';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/camera" element={<CameraCapture />} />
            <Route path="/customize" element={<Customize />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
