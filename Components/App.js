import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.scss';
import { Suspense, lazy } from 'react';

// load inital components
import Main from './components/Main';
import Loading from './components/Loading';

//lazy loaded components
const Fish = lazy(() => import('./components/Fish'));
const PeaRun = lazy(() => import('./components/PeaRun'));
const TileDropper = lazy(() => import('./components/TileDropper'));
const ToggleButton = lazy(() => import('./components/ToggleButton'));


function App() {
  return (
    <Router>
      <Suspense fallback={<Loading/>}>
        <Routes>
          {/*main page*/}
          <Route path="/" element={<Main/>} /> 
          
          {/*components*/}
          <Route path="/fish-demo" element={<Fish />} />
          <Route path="/pearun-demo" element={<PeaRun />} />
          <Route path="/tiledropper-demo" element={<TileDropper/>} />
          <Route path="/togglebutton-demo" element={<ToggleButton/>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
