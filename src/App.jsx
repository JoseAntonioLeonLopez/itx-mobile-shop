import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header/Header'
import ProductList from './pages/ProductList/ProductList'
import ProductDetail from './pages/ProductDetail/ProductDetail'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Toaster position="top-right" toastOptions={{ duration: 2500, style: { fontFamily: 'var(--font-family)', borderRadius: 'var(--radius-md)' } }} />
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