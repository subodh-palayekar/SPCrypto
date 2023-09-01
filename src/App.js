
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import Navbar from './Components/Nav/Navbar';
import Credits from './Components/Credits/Credits';


function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/coins/:id' element={<CoinPage/>}></Route>
    </Routes>
    <Credits/>
    </>
  );
}

export default App;
