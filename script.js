document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const uploadSection = document.getElementById('upload-section');
    const uploadButton = document.getElementById('upload-button');
    const imageUpload = document.getElementById('image-upload');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    const dashboard = document.getElementById('dashboard');
    const uploadedImage = document.getElementById('uploaded-image');
    const severityOutput = document.getElementById('severity-output');
    const locationOutput = document.getElementById('location-output');
    const actionOutput = document.getElementById('action-output');
    
    const resetButton = document.getElementById('reset-button');

    // --- Event Listeners ---

    // Trigger file input when the main upload button is clicked
    uploadButton.addEventListener('click', () => {
        imageUpload.click();
    });

    // Handle the file selection
    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            processImage(file);
        }
    });

    // Reset the UI to report another incident
    resetButton.addEventListener('click', () => {
        uploadSection.style.display = 'block';
        dashboard.style.display = 'none';
        imageUpload.value = ''; // Clear file input
    });

    // --- Core Functions ---

    function processImage(file) {
        // Show loading state
        uploadButton.style.display = 'none';
        loadingSpinner.style.display = 'block';

        // Read the image file and display it
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage.src = e.target.result;
        };
        reader.readAsDataURL(file);

        // Simulate AI processing delay
        setTimeout(() => {
            // Mock AI analysis
            const analysis = mockAIClassification();

            // Populate and display the dashboard
            updateDashboard(analysis);

            // Hide loading and upload section, show dashboard
            loadingSpinner.style.display = 'none';
            uploadButton.style.display = 'block'; // Restore button for next time
            uploadSection.style.display = 'none';
            dashboard.style.display = 'block';
        }, 2000); // 2-second delay to simulate processing
    }

    /**
     * MOCKED AI CLASSIFICATION LOGIC
     * This function simulates an AI model by randomly assigning a severity level.
     * In a real application, you would replace this with an API call to a machine learning model.
     */
    function mockAIClassification() {
        const severities = ['Critical', 'Moderate', 'Low'];
        const actions = {
            'Critical': 'Immediate attention required! Alerting emergency services.',
            'Moderate': 'Schedule for review within 24 hours. Assigning to a civic team.',
            'Low': 'Logged for routine maintenance. No immediate action needed.'
        };

        // Randomly select a severity level
        const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
        const recommendedAction = actions[randomSeverity];

        return {
            severity: randomSeverity,
            location: mockGpsLocation(),
            action: recommendedAction,
        };
    }

    /**
     * MOCKED GPS LOCATION
     * Generates a random GPS coordinate for demonstration purposes.
     */
    function mockGpsLocation() {
        const lat = (Math.random() * (40.7128 - 34.0522) + 34.0522).toFixed(6); // US Latitude range
        const lon = (Math.random() * (-74.0060 - -118.2437) + -118.2437).toFixed(6); // US Longitude range
        return `${lat}, ${lon}`;
    }

    /**
     * Updates the dashboard with the analysis results.
     */
    function updateDashboard(analysis) {
        // Update severity text and class for color-coding
        severityOutput.textContent = analysis.severity;
        severityOutput.className = 'value ' + analysis.severity.toLowerCase();

        // Update location and recommended action
        locationOutput.textContent = analysis.location;
        actionOutput.textContent = analysis.action;
    }
});
