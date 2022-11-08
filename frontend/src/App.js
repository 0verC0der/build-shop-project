import './App.css';
import Header from './components/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Catalogue from './components/Catalogue';
import ProductDetails from './components/ProductDetail';



function App(){
  return (
    <div className='App'>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Catalogue/>}/>
        <Route path='/catalogue/:id' element = {<ProductDetails/>}/>
        <Route>404 Not Found!</Route>
      </Routes> 
    </Router>   
    </div>
  );
}

export default App;
