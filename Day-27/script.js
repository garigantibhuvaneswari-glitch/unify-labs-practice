let products = JSON.parse(localStorage.getItem("products")) || [];

function saveToStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function renderProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((product, index) => {
    list.innerHTML += `
      <li>
        ${index} - ${product.name} | Price: ${product.price} | Stock: ${product.stock}
      </li>
    `;
  });
}

function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const stock = document.getElementById("stock").value;

  products.push({ name, price, stock });
  saveToStorage();
  renderProducts();
}

function updateStock() {
  const id = document.getElementById("updateId").value;
  const newStock = document.getElementById("updateStock").value;

  if (products[id]) {
    products[id].stock = newStock;
    saveToStorage();
    renderProducts();
  }
}

function deleteProduct() {
  const id = document.getElementById("deleteId").value;

  if (products[id]) {
    products.splice(id, 1);
    saveToStorage();
    renderProducts();
  }
}

renderProducts();