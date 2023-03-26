import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.DEEPL_API_KEY;

// Function to translate selected text using Deepl
async function translateText(text) {
  const response = await fetch(
    `https://api-free.deepl.com/v2/translate?auth_key=${apiKey}&text=${encodeURIComponent(
      text
    )}&target_lang=EN`
  );
  const result = await response.json();
  return result.translations[0].text;
}

// Function to create a popup with the translated text
function createPopup(text, x, y) {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = `${y}px`;
  popup.style.left = `${x}px`;
  popup.style.padding = "10px";
  popup.style.background = "white";
  popup.style.border = "1px solid #ddd";
  popup.style.boxShadow = "0 0 10px #ddd";
  popup.style.zIndex = "999999";
  popup.textContent = text;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 5000);
}

// Event listener for mouseup events
document.addEventListener("mouseup", async (event) => {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    const translatedText = await translateText(selectedText);
    createPopup(translatedText, event.pageX, event.pageY);
  }
});
