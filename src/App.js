// import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import LazyLoading from './components/LazyLoading'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LazyLoading/>}></Route>
        <Route path="/form" element={<Dashboard/>} ></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
