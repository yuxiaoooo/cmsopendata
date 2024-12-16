async function searchDAS() {
    const filename = document.getElementById('filenameInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "Searching...";

    try {
        const response = await fetch(`/search?filename=${filename}`);

        if (!response.ok) {
            resultsDiv.innerHTML = "Error fetching data. Please try again.";
            return;
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            resultsDiv.innerHTML = "<h2>Results:</h2><ul>" +
                data.map(item => {
                    // Access the dataset array and extract the name
                    const datasetName = item.dataset && item.dataset.length > 0 ? item.dataset[0].name : 'No dataset name available';
                    return `<li>${datasetName}</li>`;
                }).join('') +
                "</ul>";
        } else {
            resultsDiv.innerHTML = "No results found.";
        }
    } catch (error) {
        console.error("Error:", error);
        resultsDiv.innerHTML = "Error fetching data. Please check the console for details.";
    }
}

function updateInputValue() {
    // Get the value entered by the user
    const userPDInput = document.getElementById('PDInput').value;
    const userProcessInput = document.getElementById('ProcessInput').value;
    const userDTInput = document.getElementById('DTInput').value;

    // Update the hidden input field with "dataset={user's input}"
    document.getElementById('hiddenInput').value = `dataset=/*${userPDInput}*/*${userProcessInput}*/*${userDTInput}*`;
}
