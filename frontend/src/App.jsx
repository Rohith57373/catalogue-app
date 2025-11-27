import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryDesigns from './pages/CategoryDesigns';
import DesignDetails from './pages/DesignDetails';
import BookDesign from './pages/BookDesign';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLayout from './components/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AddDesign from './pages/admin/AddDesign';
import ManageDesigns from './pages/admin/ManageDesigns';
import EditDesign from './pages/admin/EditDesign';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="category/:id" element={<CategoryDesigns />} />
          <Route path="design/:id" element={<DesignDetails />} />
          <Route path="book/:designId" element={<BookDesign />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upload" element={<AddDesign />} />
          <Route path="designs" element={<ManageDesigns />} />
          <Route path="designs/edit/:id" element={<EditDesign />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
