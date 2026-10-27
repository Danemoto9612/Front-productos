describe("Pruebas de Automatización - Gestión de Productos", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Debe registrar un nuevo producto en la lista", () => {
    // Interceptar la petición POST al backend
    cy.intercept("POST", "http://localhost:8080/api/productos").as(
      "createProduct",
    );

    // Llenar el formulario
    cy.get('input[placeholder="Ej. Teclado Mecánico"]').type("Mouse Gamer RGB");
    cy.get('input[placeholder="Ej. 49.99"]').type("45.50");
    cy.contains("button", "Guardar").click();

    // Confirmar petición backend exitosa
    cy.wait("@createProduct").its("response.statusCode").should("eq", 200);

    // Validar en la tabla UI
    cy.get("table").should("contain", "Mouse Gamer RGB");
    cy.get("table").should("contain", "$45.50");
  });

  it("Debe eliminar un producto existente", () => {
    // Interceptar DELETE
    cy.intercept("DELETE", "http://localhost:8080/api/productos/*").as(
      "deleteProduct",
    );

    // Hacer clic en el primer botón de eliminar
    cy.get("table tbody tr").first().contains("button", "Eliminar").click();

    // Confirmar respuesta DELETE
    cy.wait("@deleteProduct").its("response.statusCode").should("eq", 204);
  });
});
