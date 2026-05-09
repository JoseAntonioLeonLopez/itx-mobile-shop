import { describe, it, expect, beforeEach, vi } from "vitest";
import { setCache, getCache } from "./cache";

const storageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: storageMock, writable: true });

describe("cache service", () => {
  beforeEach(() => {
    storageMock.clear();
    vi.restoreAllMocks();
  });

  it("guarda y recupera datos correctamente", () => {
    const data = [{ id: "0001", brand: "Apple" }];
    setCache("products", data);
    expect(getCache("products")).toEqual(data);
  });

  it("devuelve null si la clave no existe", () => {
    expect(getCache("no_existe")).toBeNull();
  });

  it("devuelve null si el caché ha expirado", () => {
    const data = [{ id: "0001" }];
    setCache("products", data);

    // Simulamos que ha pasado más de 1 hora
    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 61 * 60 * 1000);

    expect(getCache("products")).toBeNull();
  });

  it("elimina la entrada del localStorage cuando expira", () => {
    setCache("products", [{ id: "0001" }]);
    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 61 * 60 * 1000);

    getCache("products");

    expect(localStorage.getItem("products")).toBeNull();
  });

  it("devuelve datos si no ha pasado 1 hora", () => {
    const data = { id: "0001", brand: "Samsung" };
    setCache("product_0001", data);

    // Simulamos que han pasado 30 minutos
    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 30 * 60 * 1000);

    expect(getCache("product_0001")).toEqual(data);
  });
});
