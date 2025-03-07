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
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Placeholder for quotes API  

// Function to fetch quotes from the mock server  
function fetchQuotesFromServer() {  
    fetch(SERVER_URL)  
        .then(response => response.json())  
        .then(data => {  
            syncLocalDataWithServer(data); // Sync with local data  
        })  
        .catch(error => {  
            console.error("Error fetching data from server:", error);  
        });  
}  

// Set an interval to periodically check for updates (every 5 seconds)  
setInterval(fetchQuotesFromServer, 5000);  
function syncLocalDataWithServer(fetchedQuotes) {  
    const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];  
    
    // Create a map to track existing quotes by their IDs or other unique identifiers  
    const existingQuotesMap = Object.fromEntries(localQuotes.map(q => [q.id, q]));  

    fetchedQuotes.forEach(serverQuote => {  
        if (!existingQuotesMap[serverQuote.id]) {  
            // If quote doesn't exist locally, add it  
            localQuotes.push(serverQuote);  
        } else {  
            // If it does exist, we can overwrite the local version with the server version  
            const index = localQuotes.findIndex(q => q.id === serverQuote.id);  
            localQuotes[index] = serverQuote; // Server data takes precedence  
        }  
    });  

    // Update local storage with the merged quotes  
    localStorage.setItem("quotes", JSON.stringify(localQuotes));  
    displayQuotes(localQuotes); // Update UI to reflect new quotes  
}  
function notifyUserOfUpdates() {  
    alert("Your quotes have been updated from the server.");  
}  

// Call this function when updates are made  
function updateUserInterface(fetchedQuotes) {  
    // Example of calling when fetching new quotes  
    notifyUserOfUpdates();  
}  

function resolveConflict(localQuote, serverQuote) {  
    // Custom logic to resolve conflicts; for example, prompt user:  
    const userChoice = confirm("A conflict was detected. Do you want to keep the local version?");  
    return userChoice ? localQuote : serverQuote;  
}  
function addQuoteToServer(quote) {  
    fetch(SERVER_URL, {  
        method: "POST",  
        headers: {  
            "Content-Type": "application/json",  
        },  
        body: JSON.stringify(quote),  
    })  
    .then(response => response.json())  
    .then(data => {  
        addQuote(data.title, data.body); // Assuming response returns the new quote  
        displayQuotes(JSON.parse(localStorage.getItem("quotes"))); // Refresh quotes  
    })  
    .catch(error => {  
        console.error("Error posting data to server:", error);  
    });  
}  
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Placeholder for quotes API  
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];  

// Run on page load  
window.onload = async function() {  
    await fetchQuotesFromServer();  
    populateCategories(); // Populate categories after fetching  
    displayQuotes(quotes); // Display initial quotes  
    setInterval(fetchQuotesFromServer, 5000); // Refresh data every 5 seconds  
};  

// Fetch quotes from the mock server  
async function fetchQuotesFromServer() {  
    try {  
        const response = await fetch(SERVER_URL);  
        const fetchedQuotes = await response.json();  
        await syncLocalDataWithServer(fetchedQuotes); // Sync with local data  
    } catch (error) {  
        console.error("Error fetching data from server:", error);  
    }  
}  

// Synchronize local data with server data  
async function syncLocalDataWithServer(fetchedQuotes) {  
    const localQuotesMap = Object.fromEntries(quotes.map(quote => [quote.id, quote]));  

    fetchedQuotes.forEach(serverQuote => {  
        if (!localQuotesMap[serverQuote.id]) {  
            // Add new server quote to local quotes  
            quotes.push(serverQuote);  
        } else {  
            // Handle conflict resolution; server data takes precedence  
            const localQuote = localQuotesMap[serverQuote.id];  
            const resolvedQuote = resolveConflict(localQuote, serverQuote);  
            const index = quotes.findIndex(q => q.id === resolvedQuote.id);  
            quotes[index] = resolvedQuote; // Update local quotes with the resolved quote  
        }  
    });  

    localStorage.setItem("quotes", JSON.stringify(quotes)); // Update local storage  
    displayQuotes(quotes); // Update UI  
}  

// Conflict resolution function — can be customized  
function resolveConflict(localQuote, serverQuote) {  
    // Logic to determine which quote to retain (here, we simply prefer server data)  
    return serverQuote;   
}  

// Populate categories dynamically  
function populateCategories() {  
    const categories = new Set(quotes.map(quote => quote.category));  
    const categoryFilter = document.getElementById("categoryFilter");  
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Clear previous options  

    categories.forEach(category => {  
        const option = document.createElement("option");  
        option.value = category;  
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);  
        categoryFilter.appendChild(option);  
    });  

    // Restore last selected category  
    const lastSelectedCategory = localStorage.getItem("selectedCategory") || "all";  
    categoryFilter.value = lastSelectedCategory;  
}  

// Display quotes in the UI  
function displayQuotes(quotesToDisplay) {  
    const quoteContainer = document.getElementById("quoteContainer");  
    quoteContainer.innerHTML = ""; // Clear existing quotes  

    quotesToDisplay.forEach(quote => {  
        const quoteElement = document.createElement("div");  
        quoteElement.textContent = quote.title || quote.text; // Adjust based on the quote structure  
        quoteContainer.appendChild(quoteElement);  
    });  
}  

// Add new quote function (with potential for server synchronization)  
async function addQuote(text, category) {  
    const newQuote = {  
        title: text, // Assuming title for integration with placeholder API  
        body: "Your quote message here.", // Placeholder for your content  
        category: category || "general", // Default category if none provided  
        id: quotes.length + 1, // Simple ID generation for the local dataset  
    };  

    // Add to local storage first  
    quotes.push(newQuote);  
    localStorage.setItem("quotes", JSON.stringify(quotes));  
    
    // Optionally, post to the server  
    await addQuoteToServer(newQuote); // Send new quote to the server  
    displayQuotes(quotes); // Refresh displayed quotes  
}  

// Function to add quote to server  
async function addQuoteToServer(quote) {  
    try {  
        const response = await fetch(SERVER_URL, {  
            method: "POST",  
            headers: {  
                "Content-Type": "application/json",  
            },  
            body: JSON.stringify(quote),  
        });  
        const data = await response.json();  
        console.log("Quote added to server:", data);  
    } catch (error) {  
        console.error("Error posting data to server:", error);  
    }  
}  

// Call a function to notify users of updates.  
function notifyUserOfUpdates() {  
    alert("Your quotes have been updated from the server.");  
}  
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Placeholder API for quotes  
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];  

// Run on page load  
window.onload = async function() {  
    await fetchQuotesFromServer(); // Initial fetch  
    populateCategories(); // Populate categories after fetching  
    displayQuotes(quotes); // Display initial quotes  
    setInterval(fetchQuotesFromServer, 5000); // Refresh data every 5 seconds  
};  

// Fetch quotes from the server  
async function fetchQuotesFromServer() {  
    try {  
        const response = await fetch(SERVER_URL);  
        const fetchedQuotes = await response.json();  
        syncQuotes(fetchedQuotes); // Sync with local data  
    } catch (error) {  
        console.error("Error fetching data from server:", error);  
    }  
}  

// Sync quotes between local storage and server  
function syncQuotes(fetchedQuotes) {  
    const localQuoteMap = Object.fromEntries(quotes.map(quote => [quote.id, quote])); // Map local quotes by ID  

    fetchedQuotes.forEach(serverQuote => {  
        if (!localQuoteMap[serverQuote.id]) {  
            // If the server quote does not exist locally, add it  
            quotes.push(serverQuote);   
        } else {  
            // If it exists, we need to check for conflicts  
            const localQuote = localQuoteMap[serverQuote.id];  
            const resolvedQuote = resolveConflict(localQuote, serverQuote);  
            const index = quotes.findIndex(q => q.id === resolvedQuote.id);  
            quotes[index] = resolvedQuote; // Update local quotes with the resolved one  
        }  
    });  

    localStorage.setItem("quotes", JSON.stringify(quotes)); // Update local storage  
    displayQuotes(quotes); // Reflect the updated quotes in the UI  
}  

// Basic conflict resolution function  
function resolveConflict(localQuote, serverQuote) {  
    // For this demo, we prioritize server data; adjust as necessary  
    return serverQuote;   
}  

// Populate categories dynamically  
function populateCategories() {  
    const categories = new Set(quotes.map(quote => quote.category));  
    const categoryFilter = document.getElementById("categoryFilter");  
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Clear previous options  

    categories.forEach(category => {  
        const option = document.createElement("option");  
        option.value = category;  
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);  
        categoryFilter.appendChild(option);  
    });  

    // Restore last selected category  
    const lastSelectedCategory = localStorage.getItem("selectedCategory") || "all";  
    categoryFilter.value = lastSelectedCategory;  
}  

// Display quotes in the UI  
function displayQuotes(quotesToDisplay) {  
    const quoteContainer = document.getElementById("quoteContainer");  
    quoteContainer.innerHTML = ""; // Clear existing quotes  

    quotesToDisplay.forEach(quote => {  
        const quoteElement = document.createElement("div");  
        quoteElement.textContent = quote.title || quote.text; // Adjust based on your quote structure  
        quoteContainer.appendChild(quoteElement);  
    });  
}  

// Add a new quote  
async function addQuote(text, category) {  
    const newQuote = {  
        title: text, // Assuming title format  
        body: "Your quote message here.", // Placeholder for your content  
        category: category || "general",  
        id: quotes.length + 1, // ID generation for the local dataset  
    };  

    // Add to local storage first  
    quotes.push(newQuote);  
    localStorage.setItem("quotes", JSON.stringify(quotes));  
    
    // Optionally, post to the server  
    await addQuoteToServer(newQuote); // Send new quote to the server  
    displayQuotes(quotes); // Refresh displayed quotes after adding  
}  

// Function to add quote to server  
async function addQuoteToServer(quote) {  
    try {  
        const response = await fetch(SERVER_URL, {  
            method: "POST",  
            headers: {  
                "Content-Type": "application/json",  
            },  
            body: JSON.stringify(quote),  
        });  
        const data = await response.json();  
        console.log("Quote added to server:", data);  
    } catch (error) {  
        console.error("Error posting data to server:", error);  
    }  
}  

// Notify users of updates  
function notifyUserOfUpdates() {  
    alert("Your quotes have been updated from the server.");  
}  
