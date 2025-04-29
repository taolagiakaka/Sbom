# SBOM Generator

This project generates a Software Bill of Materials (SBOM) in CSV format by fetching metadata for NuGet packages listed in a JSON file.

## Features

-   Reads package information from a JSON file.
-   Fetches metadata for each package from the NuGet API.
-   Exports the data to a CSV file.

## Prerequisites

-   Node.js (v16 or later)
-   npm (Node Package Manager)

## Installation

1. Clone the repository:
    ```sh npm install
    git clone <repository-url>
    cd <repository-folder>
    ```
2. Install dependencies:

## Example JSON File

```json
[
    {
        "Include": "package-name",
        "Version": "package-version"
    }
]
```
