// script.js  
let quotes = [  
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },  
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },  
    { text: "Get busy living or get busy dying.", category: "Life" },  
    { text: "You have within you right now, everything you need to deal with whatever the world can throw at you.", category: "Inspiration" }  
];  

// Function to display a random quote  
function showRandomQuote() {  
    const quoteDisplay = document.getElementById("quoteDisplay");  
    // Clear existing content before adding the new quote  
    while (quoteDisplay.firstChild) {  
        quoteDisplay.removeChild(quoteDisplay.firstChild);  
    }  
    
    const randomIndex = Math.floor(Math.random() * quotes.length);  
    
    // Create a new text node for the quote  
    const quoteTextNode = document.createTextNode(`"${quotes[randomIndex].text}"`);  
    
    // Create a span element for the category  
    const quoteCategorySpan = document.createElement("span");  
    quoteCategorySpan.textContent = ` - ${quotes[randomIndex].category}`;  
    
    // Append the quote text and category to the display div  
    quoteDisplay.appendChild(quoteTextNode);  
    quoteDisplay.appendChild(quoteCategorySpan);  
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

    // Clear the input fields after adding the quote  
    document.getElementById("newQuoteText").value = "";  
    document.getElementById("newQuoteCategory").value = "";  
    
    alert("Quote added successfully!");  
}  

// Set up event listener for button  
document.getElementById("newQuote").addEventListener("click", showRandomQuote);  
