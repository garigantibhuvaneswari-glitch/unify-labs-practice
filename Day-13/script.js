function calculate() {
  let userName = document.getElementById("username").value;
  let num1 = Number(document.getElementById("num1").value);
  let num2 = Number(document.getElementById("num2").value);

  let sum = num1 + num2;
  let product = num1 * num2;
  let remainder = num1 % num2;

  document.getElementById("welcome").innerText =
    "Welcome, " + userName + "!";

  document.getElementById("sum").innerText =
    "Sum: " + sum;

  document.getElementById("product").innerText =
    "Product: " + product;

  document.getElementById("remainder").innerText =
    "Remainder: " + remainder;
}