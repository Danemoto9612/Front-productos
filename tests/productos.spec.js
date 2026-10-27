import { test, expect } from "@playwright/test";

test.describe("Flujo de Gestión de Productos", () => {
  test("Crear y validar nuevo producto", async ({ page }) => {
    // 1. Ir a la app React
    await page.goto("http://localhost:5173");

    // 2. Llenar el formulario
    await page
      .locator('input[placeholder="Ej. Teclado Mecánico"]')
      .fill("Silla Gamer Pro");
    await page.locator('input[placeholder="Ej. 49.99"]').fill("199.90");

    // 3. Hacer clic en Guardar
    await page.getByRole("button", { name: "Guardar" }).click();

    // 4. Assert: Verificar que aparece en la tabla
    const filaProducto = page.locator("table tbody tr", {
      hasText: "Silla Gamer Pro",
    });
    await expect(filaProducto).toBeVisible();
    await expect(filaProducto).toContainText("$199.90");
  });

  test("Prueba de API directa con Playwright", async ({ request }) => {
    // Petición directa al backend Spring Boot
    const response = await request.get("http://localhost:8080/api/productos");
    expect(response.status()).toBe(200);

    const productos = await response.json();
    expect(Array.isArray(productos)).toBeTruthy();
  });
});
