import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("renderiza el input correctamente", () => {
    render(<SearchBar onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText(/buscar/i)).toBeInTheDocument();
  });

  it("llama a onSearch cuando el usuario escribe", async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/buscar/i);
    await userEvent.type(input, "Liquid");

    expect(onSearch).toHaveBeenCalledTimes(6); // una vez por cada letra
    expect(onSearch).toHaveBeenLastCalledWith("Liquid");
  });

  it("llama a onSearch con string vacío al borrar el contenido", async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText(/buscar/i);
    await userEvent.type(input, "Liquid");
    await userEvent.clear(input);

    expect(onSearch).toHaveBeenLastCalledWith("");
  });
});
