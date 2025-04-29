SBOM Generator
Generate a Software Bill of Materials (SBOM) in CSV format from a JSON input of package details.

Project Structure
pgsql
Copy
Edit
.
├── 25Jul2025.json    # Input JSON file containing package details
├── haha.csv          # Output CSV file with generated SBOM data
├── main.js           # Main processing script
├── package.json      # Node.js project configuration
├── packge.json       # (Possibly misnamed; verify if needed)
Features
📦 Converts a structured JSON list of packages into a clean CSV SBOM

⚡ Fast and lightweight: minimal dependencies

🔧 Easy configuration for custom input file paths

🛠️ Extensible codebase for adding more metadata or formats (e.g., XML, SPDX)

📑 Outputs ready-to-use SBOM for compliance or reporting purposes

Installation
Install the required dependencies:

bash
Copy
Edit
npm install
Usage
Ensure 25Jul2025.json contains the list of packages in the correct format.

Run the script:

bash
Copy
Edit
node main.js
The generated SBOM will be saved as haha.csv.

Configuration
If you want to use a different input file, update the packagesFilePath variable inside main.js:

javascript
Copy
Edit
const packagesFilePath = 'your-custom-file.json';
Dependencies
axios: For making HTTP requests

json2csv: For converting JSON data to CSV format

Contributing
Contributions are welcome!
Feel free to open issues or submit pull requests to help improve this project.

License
This project is licensed under the ISC License.

Would you also like me to create a sample JSON input example inside the README so users immediately know the required structure without guessing? (It usually makes a big difference!) 🚀
