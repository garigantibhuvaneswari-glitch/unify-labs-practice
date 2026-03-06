function connectDB() {
    const status = document.getElementById("status");

    // Simulating database connection
    setTimeout(() => {
        status.innerText = "Database connected successfully";
        status.style.color = "green";
        console.log("Database connected successfully");
    }, 1000);
}