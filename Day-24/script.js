let products = [];

// Bulk Population
function bulkInsert() {
  products = [
    { name: "Laptop", category: "Electronics", price: 60000, stock: 10 },
    { name: "Mobile", category: "Electronics", price: 25000, stock: 15 },
    { name: "T-Shirt", category: "Clothing", price: 800, stock: 50 },
    { name: "Shirt", category: "Clothing", price: 1500, stock: 30 },
    { name: "Chair", category: "Furniture", price: 30000, stock: 5 },
    { name: "Table", category: "Furniture", price: 7000, stock: 8 }
  ];
  display(products);
}

// Query 1: Find Electronics
function findElectronics() {
  const result = products.filter(p => p.category === "Electronics");
  display(result);
}

// Query 2: Sort by price desc & limit 2
function sortAndLimit() {
  const result = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 2);
  display(result);
}

// Show All
function showAll() {
  display(products);
}

// Display function
function display(data) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  data.forEach(p => {
    tableBody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.price}</td>
        <td>${p.stock}</td>
      </tr>
    `;
  });
}
