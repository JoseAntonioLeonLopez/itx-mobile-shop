import { describe, it, expect, beforeEach, vi } from "vitest";
import { getProducts, getProductById, addToCart } from "./api";
import * as cache from "./cache";

// Mock del módulo cache para controlar su comportamiento
vi.mock("./cache", () => ({
  getCache: vi.fn(),
  setCache: vi.fn(),
}));

// Mock de fetch global
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe("api service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getProducts", () => {
    it("devuelve datos del caché si existen", async () => {
      const cachedData = [{ id: "0001", brand: "Apple" }];
      cache.getCache.mockReturnValue(cachedData);

      const result = await getProducts();

      expect(result).toEqual(cachedData);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("llama al API si no hay caché y guarda el resultado", async () => {
      const apiData = [{ id: "0001", brand: "Apple" }];
      cache.getCache.mockReturnValue(null);
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(apiData),
      });

      const result = await getProducts();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://itx-frontend-test.onrender.com/api/product",
      );
      expect(cache.setCache).toHaveBeenCalledWith("products", apiData);
      expect(result).toEqual(apiData);
    });
  });

  describe("getProductById", () => {
    it("devuelve datos del caché si existen", async () => {
      const cachedProduct = { id: "0001", brand: "Apple", model: "iPhone" };
      cache.getCache.mockReturnValue(cachedProduct);

      const result = await getProductById("0001");

      expect(result).toEqual(cachedProduct);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it("llama al API con el id correcto si no hay caché", async () => {
      const product = { id: "0001", brand: "Apple" };
      cache.getCache.mockReturnValue(null);
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve(product),
      });

      await getProductById("0001");

      expect(mockFetch).toHaveBeenCalledWith(
        "https://itx-frontend-test.onrender.com/api/product/0001",
      );
      expect(cache.setCache).toHaveBeenCalledWith("product_0001", product);
    });
  });

  describe("addToCart", () => {
    it("hace POST con los datos correctos", async () => {
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve({ count: 1 }),
      });

      const result = await addToCart("0001", 1, 2);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://itx-frontend-test.onrender.com/api/cart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: "0001", colorCode: 1, storageCode: 2 }),
        },
      );
      expect(result).toEqual({ count: 1 });
    });
  });
});
