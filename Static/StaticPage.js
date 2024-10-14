document.getElementById('apiForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const inputData = document.getElementById('inputData').value;
    
    // Define your API Gateway endpoint here
    const apiUrl = 'https://your-api-gateway-endpoint.amazonaws.com/prod/your-resource';
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST', // or GET, depending on your API setup
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: inputData }),
        });
        
        const result = await response.json();
        document.getElementById('response').textContent = `Response: ${JSON.stringify(result)}`;
    } catch (error) {
        document.getElementById('response').textContent = `Error: ${error}`;
    }
});
