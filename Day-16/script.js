
function convertTitleCase() {
    let text = document.getElementById("userInput").value.trim();
    
    let titleCase = text
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    document.getElementById("result").innerText = titleCase;
}

function countVowels() {
    let text = document.getElementById("userInput").value.trim();
    let count = 0;

    for (let char of text.toLowerCase()) {
        if ("aeiou".includes(char)) {
            count++;
        }
    }

    document.getElementById("result").innerText = 
        "Total Vowels: " + count;
}

function generateSecret() {
    let text = document.getElementById("userInput").value.trim();

    let secretWords = ["secret", "password", "confidential"];

    let words = text.split(" ").map(word => {
        if (secretWords.includes(word.toLowerCase())) {
            return "***";
        }
        return word;
    });

    document.getElementById("result").innerText = words.join(" ");
}