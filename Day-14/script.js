let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let maxAttempts = 10;

function checkGuess() {
  let userGuess = Number(document.getElementById("guessInput").value);
  let message = document.getElementById("message");
  let attemptsText = document.getElementById("attempts");

  attempts++;

  while (attempts <= maxAttempts) {

    if (userGuess === randomNumber) {
      message.innerHTML = "🎉 Correct! You guessed the number!";
      message.style.color = "green";
      break;
    } 
    else if (userGuess > randomNumber) {
      message.innerHTML = "📉 Too High!";
      message.style.color = "red";
      break;
    } 
    else {
      message.innerHTML = "📈 Too Low!";
      message.style.color = "blue";
      break;
    }
  }

  attemptsText.innerHTML = `Attempts: ${attempts} / ${maxAttempts}`;

  if (attempts === maxAttempts && userGuess !== randomNumber) {
    message.innerHTML = "❌ Game Over! Number was " + randomNumber;
    message.style.color = "darkred";
    document.querySelector("button").disabled = true;
  }
}
