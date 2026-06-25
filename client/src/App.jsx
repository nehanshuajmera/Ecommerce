import { Routes, Route } from 'react-router-dom';

import { TopHeader } from './components/topHeader/topHeader,component.jsx';
import { Header } from './components/header/header.component.jsx';
import { Footer } from './components/footer/footer.component.jsx';

import { SignUp } from './pages/signup/signup.component.jsx';
import { About } from './pages/about/about.component.jsx';
import { HomePage } from './pages/homepage/homepage.component.jsx';
import { SignIn } from './pages/signin/signin.component.jsx';
import { Cart } from './pages/cart/cartpage.component.jsx';
import { WishlistPage } from './pages/wishlist/wishlist.component.jsx';
import { Contact } from './pages/contact/contact.component.jsx';

const App = () => {
  return (
    <div className='app'>
      <TopHeader />
      <Header />
      <div className='pages'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<WishlistPage />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
