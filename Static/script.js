const apiUrl = 'https://ppoqawo8cf.execute-api.us-east-2.amazonaws.com/Production'; // Replace with your API Gateway endpoint

function ensureTxtExtension(filename) {
    if (!filename.endsWith('.txt')) {
        return filename + '.txt'; // Add .txt extension if not present
    }
    return filename; // Return the filename as is if it already has .txt
}
// Function to upload a file
async function uploadFile(filename, content) {
    const updatedFilename = ensureTxtExtension(filename); // Ensure .txt extension
    const body = {
        httpMethod: "POST",
        queryStringParameters: {
            filename: updatedFilename
        },
        body: btoa(content) // Convert content to base64
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const result = await response.json();
    console.log(result);
}

// Function to search for a file
async function searchFile(filename) {
    const body = {
        httpMethod: "GET",
        queryStringParameters: {
            filename: filename
        }
    };

    const response = await fetch(`${apiUrl}?filename=${encodeURIComponent(filename)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    console.log(result);
    searchResultDiv.innerHTML = ''; 

    if (result && result.length > 0) {
        const resultText = result.map(file => `<p>${file.filename}: ${atob(file.body)}</p>`).join('');
        searchResultDiv.innerHTML = `<h3>Search Results:</h3>${resultText}`;
    } else {
        searchResultDiv.innerHTML = '<p>No files found.</p>';
    }
}

// Function to list all files
async function listFiles() {
    const body = {
        httpMethod: "GET"
    };

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    console.log(result);

    const fileListDiv = document.getElementById("fileList");
    fileListDiv.innerHTML = ''; // Clear previous results

    if (result && result.length > 0) {
        const fileItems = result.map(file => `<p>${file.filename}</p>`).join('');
        fileListDiv.innerHTML = `<h3>Files:</h3>${fileItems}`;
    } else {
        fileListDiv.innerHTML = '<p>No files found.</p>';
    }
}

// Example usage
document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    const filename = document.getElementById("filename").value;
    const content = document.getElementById("content").value;
    uploadFile(filename, content);
});

document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    const filename = document.getElementById("searchFilename").value;
    searchFile(filename);
});

document.getElementById("listButton").addEventListener("click", function() {
    listFiles();
});
