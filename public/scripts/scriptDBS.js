// unsuccessful trial to fetch data from DBS

async function searchDBS() {
    const filename = document.getElementById('filenameInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "Searching...";

    try {
        const response = await fetch(`/search?filename=${encodeURIComponent(filename)}`);
        
        if (!response.ok) {
            resultsDiv.innerHTML = "Error fetching data. Please try again.";
            return;
        }

        const data = await response.json();
        
        if (data.length === 0) {
            resultsDiv.innerHTML = "No results found.";
        } else {
            resultsDiv.innerHTML = "<h2>Results:</h2><ul>" + 
                data.map(file => `<li>${file.logical_file_name}</li>`).join('') + 
                "</ul>";
        }
    } catch (error) {
        console.error("Error:", error);
        resultsDiv.innerHTML = "Error fetching data. Please check the console for details.";
    }
}

