import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import './App.css'
import ProductListing from './Pages/ProductListing'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/productListing' element={<ProductListing/>}  />
      </Routes>
       <Footer/>

    
    </BrowserRouter>
    </>
  )
}

export default App
