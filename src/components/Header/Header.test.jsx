import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import Header from "./Header";

// Helper para renderizar el Header con sus dependencias
const renderHeader = (cartCount = 0, route = "/") => {
  return render(
    <CartContext.Provider value={{ cartCount, updateCartCount: () => {} }}>
      <MemoryRouter initialEntries={[route]}>
        <Header />
      </MemoryRouter>
    </CartContext.Provider>,
  );
};

describe("Header", () => {
  it("renderiza el título de la aplicación", () => {
    renderHeader();
    expect(screen.getByText(/mobile shop/i)).toBeInTheDocument();
  });

  it("muestra el contador del carrito", () => {
    renderHeader(3);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it('muestra solo "Inicio" en el breadcrumb en la ruta /', () => {
    renderHeader(0, "/");
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.queryByText(/detalle/i)).not.toBeInTheDocument();
  });

  it('muestra "Detalle del producto" en el breadcrumb en ruta /product/:id', () => {
    renderHeader(0, "/product/0001");
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText(/detalle del producto/i)).toBeInTheDocument();
  });
});
