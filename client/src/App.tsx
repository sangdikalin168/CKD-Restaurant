import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import { Sell } from './pages/Sell/Sell';
import { Category } from './pages/Stock/Category/Category';
import Product from './pages/Stock/Product/Product';
import { SubCategory } from './pages/Stock/SubCategory/SubCategory';
import { Report } from './pages/Report/Report';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Sell />} />
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
