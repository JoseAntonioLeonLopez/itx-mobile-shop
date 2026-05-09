import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import ProductList from './pages/ProductList/ProductList'
import ProductDetail from './pages/ProductDetail/ProductDetail'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App