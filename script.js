// Function to update the page title and meta tag
function updateTitle(searchQuery) {
    const pageTitle = document.getElementById('pageTitle');
    const metaTitle = document.querySelector('meta[name="title"]');
    
    if (searchQuery) {
        const newTitle = `${searchQuery} at StackX`;
        pageTitle.textContent = newTitle;
        metaTitle.setAttribute('content', newTitle);
    } else {
        const defaultTitle = "StackX"; // Default title
        const storedQuery = sessionStorage.getItem('searchQuery'); // Get stored query
        if (storedQuery) {
            const newTitle = `${storedQuery} at StackX`;
            pageTitle.textContent = newTitle;
            metaTitle.setAttribute('content', newTitle);
        } else {
            pageTitle.textContent = defaultTitle;
            metaTitle.setAttribute('content', defaultTitle);
        }
    }
}

// Function to get the search query from the URL
function getSearchQueryFromURL() {
    const urlParams = new URLSearchParams(window.location.href.split('#')[1]); // Split URL at '#' and get query parameters
    const searchQuery = urlParams.get('gsc.q');
    if (searchQuery) {
        sessionStorage.setItem('searchQuery', searchQuery); // Store the query
    }
    return searchQuery;
}

// Function to handle page load
function onPageLoad() {
    const searchQuery = getSearchQueryFromURL();
    updateTitle(searchQuery);
}

// Add an event listener for page load
window.addEventListener('load', onPageLoad);

// Periodically check for title changes and refresh the page if needed
setInterval(function() {
    const searchQuery = getSearchQueryFromURL();
    updateTitle(searchQuery);
}, 100); // Check every 1000 milliseconds (1 second)

// Check if the Web Share API is available in the browser
if (navigator.share) {
    const shareButton = document.getElementById('shareBtn');
    // Replace 'shareBtn' with the actual ID of your share button

    // Add a click event listener to the share button
    shareButton.addEventListener('click', async () => {
        try {
            // Customize the URL to share for the share button
            const urlToShare = window.location.href;
            // Use the Web Share API to open the native sharing menu
            await navigator.share({
                title: 'Share StackX',
                text: shareButton.textContent,
                url: urlToShare
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    });
} else {
    // Web Share API not supported, provide a fallback or alternative behavior
    console.warn('Web Share API is not supported in this browser.');
}
