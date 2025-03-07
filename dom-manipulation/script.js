// script.js  
let quotes = [];  

// Load quotes from local storage on initialization  
function loadQuotes() {  
    const storedQuotes = localStorage.getItem('quotes');  
    if (storedQuotes) {  
        quotes = JSON.parse(storedQuotes);  
    }  
}  

// Save quotes to local storage  
function saveQuotes() {  
    localStorage.setItem('quotes', JSON.stringify(quotes));  
}  

// Function to display a random quote  
function showRandomQuote() {  
    const quoteDisplay = document.getElementById("quoteDisplay");  
    
    // Clear existing content before adding the new quote  
    while (quoteDisplay.firstChild) {  
        quoteDisplay.removeChild(quoteDisplay.firstChild);  
    }  
    
    if (quotes.length === 0) {  
        quoteDisplay.textContent = "No quotes available.";  
        return;  
    }  

    const randomIndex = Math.floor(Math.random() * quotes.length);  
    const quoteTextNode = document.createTextNode(`"${quotes[randomIndex].text}"`);  
    const quoteCategorySpan = document.createElement("span");  
    quoteCategorySpan.textContent = ` - ${quotes[randomIndex].category}`;  

    // Append the quote text and category to the display div  
    quoteDisplay.appendChild(quoteTextNode);  
    quoteDisplay.appendChild(quoteCategorySpan);  

    // Store the last viewed quote in session storage  
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quotes[randomIndex]));  
}  

// Function to add a new quote  
function addQuote() {  
    const newQuoteText = document.getElementById("newQuoteText").value;  
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;  

    // Validate input  
    if (newQuoteText.trim() === "" || newQuoteCategory.trim() === "") {  
        alert("Please enter both a quote and a category.");  
        return;  
    }  

    // Create a new quote object  
    const newQuote = {  
        text: newQuoteText,  
        category: newQuoteCategory  
    };  

    // Add the new quote to the quotes array  
    quotes.push(newQuote);  
    saveQuotes(); // Save to local storage  

    // Clear the input fields after adding the quote  
    document.getElementById("newQuoteText").value = "";  
    document.getElementById("newQuoteCategory").value = "";  
    
    alert("Quote added successfully!");  
}  

// Function to export quotes to JSON  
function exportQuotes() {  
    const jsonQuotes = JSON.stringify(quotes, null, 2);  
    const blob = new Blob([jsonQuotes], { type: "application/json" });  
    const url = URL.createObjectURL(blob);  
    
    const a = document.createElement("a");  
    a.href = url;  
    a.download = "quotes.json";  
    document.body.appendChild(a);  
    a.click();  
    document.body.removeChild(a);  
    URL.revokeObjectURL(url);  
}  

// Function to import quotes from JSON file  
function importFromJsonFile(event) {  
    const fileReader = new FileReader();  
    fileReader.onload = function(event) {  
        const importedQuotes = JSON.parse(event.target.result);  
        quotes.push(...importedQuotes);  
        saveQuotes(); // Save to local storage  
        alert('Quotes imported successfully!');  
    };  
    fileReader.readAsText(event.target.files[0]);  
}  

// Set up event listeners  
document.getElementById("newQuote").addEventListener("click", showRandomQuote);  
document.getElementById("exportQuotes").addEventListener("click", exportQuotes);  
document.getElementById("importFile").addEventListener("change", importFromJsonFile);  

// Load quotes on initialization  
loadQuotes();  
const quotes = [  
    { text: "Quote 1", category: "inspiration" },  
    { text: "Quote 2", category: "life" },  
    { text: "Quote 3", category: "inspiration" },  
    { text: "Quote 4", category: "humor" },  
    // More quotes...  
];  

function populateCategories() {  
    const categories = new Set(quotes.map(quote => quote.category));  
    const categoryFilter = document.getElementById("categoryFilter");  

    categories.forEach(category => {  
        const option = document.createElement("option");  
        option.value = category;  
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);  
        categoryFilter.appendChild(option);  
    });  
}  
function filterQuotes() {  
    const selectedCategory = document.getElementById("categoryFilter").value;  
    const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(quote => quote.category === selectedCategory);  
    displayQuotes(filteredQuotes);  
    localStorage.setItem("selectedCategory", selectedCategory); // Store the selected category  
}  

function displayQuotes(quotesToDisplay) {  
    const quoteContainer = document.getElementById("quoteContainer");  
    quoteContainer.innerHTML = ""; // Clear previous quotes  

    quotesToDisplay.forEach(quote => {  
        const quoteElement = document.createElement("div");  
        quoteElement.textContent = quote.text;  
        quoteContainer.appendChild(quoteElement);  
    });  
}  
window.onload = function() {  
    populateCategories();  
    const lastSelectedCategory = localStorage.getItem("selectedCategory") || "all";  
    document.getElementById("categoryFilter").value = lastSelectedCategory;  
    filterQuotes(); // Display quotes based on the last selected category  
};  
function addQuote(text, category) {  
    quotes.push({ text, category });  
    populateCategories(); // Update the category dropdown  
    filterQuotes(); // Refresh displayed quotes  
}  
