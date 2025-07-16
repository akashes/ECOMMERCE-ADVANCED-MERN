import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import './App.css'
import ProductListing from './Pages/ProductListing'
import Footer from './components/Footer'
import ProductDetails from './Pages/ProductDetails'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/productListing' element={<ProductListing/>}  />
        <Route path='/productDetails/:id' element={<ProductDetails/>}  />
      </Routes>
       <Footer/>

    
    </BrowserRouter>
    </>
  )
}

export default App
