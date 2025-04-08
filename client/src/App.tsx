import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import { Category } from './pages/Stock/Category/Category';
import Product from './pages/Stock/Product/Product';
import { SubCategory } from './pages/Stock/SubCategory/SubCategory';
import { Report } from './pages/Report/Report';
import { Pos } from './pages/Sell/Pos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Pos />} />
          <Route path="/product" element={<Product />} />
          <Route path="/category" element={<Category />} />
          <Route path="/sub_category" element={<SubCategory />} />
          <Route path="/reports" element={<Report />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
