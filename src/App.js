import logo from './logo.svg';
import './App.css';
import Company from "./components/administrator/Company"
import DisplayAllCompanies from './components/administrator/DisplayAllCompanies';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Category from './components/administrator/Category';
import Products from './components/administrator/Products';
import DisplayCategory from './components/administrator/DisplayCategory';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Company/>} path={"/company"}/>
          <Route element={<DisplayAllCompanies/>} path={"/displaycomp"}/>
          <Route element={<Category/>} path={"/category"} />
          <Route element={<Products/>} path={"/product"} />
          <Route element={<DisplayCategory/>} path={"/displaypro"} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
