import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

const mockProduct = {
  id: "NxHllbhY5noFtIc7TGI2Y",
  brand: "Acer",
  model: "Iconia Tab 8 A1-840FHD",
  price: "200",
  imgUrl:
    "https://itx-frontend-test.onrender.com/images/NxHllbhY5noFtIc7TGI2Y.jpg",
};

describe("ProductCard", () => {
  it("muestra la marca y el modelo del producto", () => {
    render(<ProductCard product={mockProduct} onClick={vi.fn()} />);
    expect(screen.getByText("Acer")).toBeInTheDocument();
    expect(screen.getByText("Iconia Tab 8 A1-840FHD")).toBeInTheDocument();
  });

  it("muestra el precio con el símbolo de euro", () => {
    render(<ProductCard product={mockProduct} onClick={vi.fn()} />);
    expect(screen.getByText("200 €")).toBeInTheDocument();
  });

  it('muestra "Precio no disponible" si no hay precio', () => {
    const productSinPrecio = { ...mockProduct, price: null };
    render(<ProductCard product={productSinPrecio} onClick={vi.fn()} />);
    expect(screen.getByText("Precio no disponible")).toBeInTheDocument();
  });

  it("llama a onClick al hacer click en la tarjeta", async () => {
    const onClick = vi.fn();
    render(<ProductCard product={mockProduct} onClick={onClick} />);

    await userEvent.click(screen.getByText("Iconia Tab 8 A1-840FHD"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renderiza la imagen con el alt correcto", () => {
    render(<ProductCard product={mockProduct} onClick={vi.fn()} />);
    const img = screen.getByAltText("Acer Iconia Tab 8 A1-840FHD");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockProduct.imgUrl);
  });
});
