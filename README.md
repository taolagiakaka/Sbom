# SBOM Generator

Generate a Software Bill of Materials (SBOM) in CSV format from a JSON input of package details.

## Project Structure

    .
    ├── 25Jul2025.json # Input JSON file containing package details
    ├── haha.csv # Output CSV file with generated SBOM data
    ├── main.js # Main processing script
    ├── package.json # Node.js project configuration
    ├── packge.json # (Possibly misnamed; verify if needed)

## Features

-   📦 Converts a structured JSON list of packages into a clean CSV SBOM
-   ⚡ Fast and lightweight: minimal dependencies
-   🔧 Easy configuration for custom input file paths
-   🛠️ Extensible codebase for adding more metadata or formats (e.g., XML, SPDX)
-   📑 Outputs ready-to-use SBOM for compliance or reporting purposes

## Installation

Install the required dependencies:

```bash
npm install

```

## Usage

1. Ensure 25Jul2025.json contains the list of packages in the correct format.
2. Run the script:

```bash
Run the script:
```

3. The generated SBOM will be saved as haha.csv.

## Configuration

If you want to use a different input file, update the packagesFilePath variable inside main.js:

```bash
const packagesFilePath = 'your-custom-file.json';
```

## Dependencies

-   axios: For making HTTP requests

-   json2csv: For converting JSON data to CSV format
