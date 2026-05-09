import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import ProductList from './ProductList'

// Mock del módulo api
vi.mock('../../services/api', () => ({
  getProducts: vi.fn(),
}))

import { getProducts } from '../../services/api.js'

const mockProducts = [
  { id: 'ZmGrkLRPXOTpxsU4jjAcv', brand: 'Acer', model: 'Iconia Talk S', price: '170', imgUrl: 'https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg' },
  { id: 'cGjFJlmqNPIwU59AOcY8H', brand: 'Samsung', model: 'Liquid Z6 Plus', price: '250', imgUrl: 'https://itx-frontend-test.onrender.com/images/cGjFJlmqNPIwU59AOcY8H.jpg' },
  { id: '8hKbH2UHPM_944nRHYN1n', brand: 'Huawei', model: 'Liquid Z6', price: '120', imgUrl: 'https://itx-frontend-test.onrender.com/images/8hKbH2UHPM_944nRHYN1n.jpg' },
]

const renderProductList = () =>
  render(
    <MemoryRouter>
      <ProductList />
    </MemoryRouter>
  )

describe('ProductList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('muestra el estado de carga inicialmente', () => {
    getProducts.mockReturnValue(new Promise(() => {})) // promesa que no resuelve
    renderProductList()
    expect(screen.getByText(/cargando/i)).toBeInTheDocument()
  })

  it('muestra los productos cuando la petición tiene éxito', async () => {
    getProducts.mockResolvedValue(mockProducts)
    renderProductList()

    await waitFor(() => {
      expect(screen.getByText('Iconia Talk S')).toBeInTheDocument()
      expect(screen.getByText('Liquid Z6 Plus')).toBeInTheDocument()
      expect(screen.getByText('Liquid Z6')).toBeInTheDocument()
    })
  })

  it('muestra el número de productos encontrados', async () => {
    getProducts.mockResolvedValue(mockProducts)
    renderProductList()

    await waitFor(() => {
      expect(screen.getByText('3 productos')).toBeInTheDocument()
    })
  })

  it('filtra por marca en tiempo real', async () => {
    getProducts.mockResolvedValue(mockProducts)
    renderProductList()

    await waitFor(() => screen.getByText('Iconia Talk S'))

    const input = screen.getByPlaceholderText(/buscar/i)
    await userEvent.type(input, 'Acer')

    expect(screen.getByText('Iconia Talk S')).toBeInTheDocument()
    expect(screen.queryByText('Liquid Z6 Plus')).not.toBeInTheDocument()
  })

  it('filtra por modelo en tiempo real', async () => {
    getProducts.mockResolvedValue(mockProducts)
    renderProductList()

    await waitFor(() => screen.getByText('Iconia Talk S'))

    const input = screen.getByPlaceholderText(/buscar/i)
    await userEvent.type(input, 'Iconia Talk S')

    expect(screen.getByText('Iconia Talk S')).toBeInTheDocument()
    expect(screen.queryByText('Liquid Z6 Plus')).not.toBeInTheDocument()
  })

  it('muestra mensaje cuando no hay resultados', async () => {
    getProducts.mockResolvedValue(mockProducts)
    renderProductList()

    await waitFor(() => screen.getByText('Iconia Talk S'))

    const input = screen.getByPlaceholderText(/buscar/i)
    await userEvent.type(input, 'Nokia')

    expect(screen.getByText(/no se encontraron/i)).toBeInTheDocument()
  })

  it('muestra error si la petición falla', async () => {
    getProducts.mockRejectedValue(new Error('Network error'))
    renderProductList()

    await waitFor(() => {
      expect(screen.getByText(/error al cargar/i)).toBeInTheDocument()
    })
  })
})