// ---------------- PET CLASS ----------------

class Pet {
}

// ---------------- CREATE PET OBJECT ----------------

const myPet = new Pet("Buddy", "Dog");

// ---------------- UI FUNCTIONS ----------------

function updateUI(message = "") {
}

function feedPet() {
  const msg = myPet.feed();
  updateUI(msg);
}

function playWithPet() {
  const msg = myPet.play();
  updateUI(msg);
}

function restPet() {
  const msg = myPet.rest();
  updateUI(msg);
}

// Initial load
updateUI("Your pet is ready! 🐾");