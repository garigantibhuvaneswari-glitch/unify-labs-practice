
let products = [
  { name: "Laptop", category: "Electronics", price: 60000, stock: 10 },
  { name: "Mobile", category: "Electronics", price: 25000, stock: 0 },
  { name: "T-Shirt", category: "Clothing", price: 800, stock: 50 },
  { name: "Shirt", category: "Clothing", price: 1500, stock: 30 },
  { name: "Chair", category: "Furniture", price: 30000, stock: 5 },
  { name: "Table", category: "Furniture", price: 7000, stock: 8 }
];

function displayProducts() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  products.forEach(p => {
    tableBody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.price}</td>
        <td>${p.stock}</td>
        <td>${p.featured ? "Yes" : "No"}</td>
      </tr>
    `;
  });
}

function increasePrice() {
  products.forEach(p => {
    if (p.category === "Electronics") {
      p.price += 10;
    }
  });
  displayProducts();
}

function setFeatured() {
  products.forEach(p => {
    if (p.price > 500) {
      p.featured = true;
    }
  });
  displayProducts();
}

function deleteStock() {
  products = products.filter(p => p.stock !== 0);
  displayProducts();
}

function showCount() {
  document.getElementById("count").innerText =
    "Total Documents: " + products.length;
}

displayProducts();