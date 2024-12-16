import express from 'express';
import { exec } from 'child_process';

const app = express();
const PORT = 8080;

// Serve static files from the public directory
app.use(express.static('public'));

// Proxy endpoint
app.get('/search', async (req, res) => {
    const filename = req.query.filename;
    if (!filename) {
        res.status(400).send("Error: 'filename' query parameter is required.");
        return;
    }

    // Construct the dasgoclient query
    // const query = `file dataset=${encodeURIComponent(filename)}`;
    const query = `dataset dataset=${filename}`;
    const command = `dasgoclient --query="${query}" --json`;

    try {
        // Execute the dasgoclient command
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("Error executing dasgoclient:", error);
                res.status(500).send("Error executing dasgoclient");
                return;
            }
            if (stderr) {
                console.error("dasgoclient stderr:", stderr);
            }

            // Parse and send the JSON response
            try {
                const data = JSON.parse(stdout);
                res.json(data);
            } catch (parseError) {
                console.error("Error parsing dasgoclient output:", parseError);
                res.status(500).send("Error parsing dasgoclient output");
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).send("Unexpected error occurred");
    }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

