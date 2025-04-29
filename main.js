const fs = require('fs');
const axios = require('axios');
const { parse } = require('json2csv');

var examples = [
    {
        Include: 'xunit.runner.visualstudio',
        Version: '2.5.6',
    },
];

const packagesFilePath = './25Jul2025.json';
function readPackages() {
    const data = fs.readFileSync(packagesFilePath, 'utf-8');
    return JSON.parse(data);
}

async function fetchCatalogEntry(pkg) {
    const id = pkg.Include.toLowerCase();
    const version = pkg.Version.toLowerCase();
    const url = `https://api.nuget.org/v3/registration5-gz-semver2/${id}/${version}.json`;

    try {
        const response = await axios.get(url);
        const catalogEntryUrl = response.data.catalogEntry;

        var catelogEntryRes = await axios.get(catalogEntryUrl);

        var entry = catelogEntryRes.data;

        return {
            Tier: '',
            Module: detectModule(pkg.Include),
            Description: entry.description
                ? chunkText(entry.description.replace(/\s+/g, ' ').trim())
                : 'N/A',
            'SDK Name': `=HYPERLINK("https://www.nuget.org/packages/${pkg.Include}/${pkg.Version}", "${pkg.Include}")`,
            'Supplier Name': entry.authors
                ? chunkText(entry.authors.replace(/\s+/g, ' ').trim())
                : 'N/A',
            'Component Name/Licensing': entry.licenseExpression || 'N/A',
            Version: pkg.Version,
            EOL: '',
            UID: '',
            'Dependency Matrix/IP rights': '',
            'Last Updated on': formatDate(entry.published),
            'Last Updated by': entry.authors
                ? chunkText(entry.authors.replace(/\s+/g, ' ').trim())
                : 'N/A',
            Links: `${
                entry.projectUrl || 'N/A'
            }\nhttps://www.nuget.org/packages/${pkg.Include}/${
                pkg.Version
            }#versions-body-tab`,
            'CVE ID': '',
        };
    } catch (error) {
        console.error(
            `❌ Failed for ${pkg.Include}@${pkg.Version} →`,
            error.message
        );
        return null;
    }
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date
        .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: '2-digit',
        })
        .replace(/ /g, '-');
}

function chunkText(text, maxLength = 80) {
    const regex = new RegExp(`.{1,${maxLength}}`, 'g');
    return text.match(regex).join('\n');
}

async function main() {
    const packages = readPackages();
    const results = [];

    for (const pkg of packages) {
        const result = await fetchCatalogEntry(pkg);
        if (result) {
            results.push(result);
        }
    }

    exportData(results);
}

const exportData = (data) => {
    try {
        const csv = parse(data);
        fs.writeFileSync('./haha.csv', csv);
        console.log('Updated jsonA saved to updatedJsonA.csv');
    } catch (err) {
        console.error('Error exporting to CSV:', err);
    }
};

function detectModule(pkgName) {
    const name = pkgName.toLowerCase();

    if (name.includes('healthcheck')) return 'Health Check';
    if (
        name.includes('npgsql') ||
        name.includes('postgres') ||
        name.includes('bulkextensions')
    )
        return 'Database';
    if (name.includes('sql') && name.includes('ef'))
        return 'Entity Framework (Database)';
    if (name.includes('efcore') || name.includes('entityframework'))
        return 'Entity Framework (ORM)';
    if (name.includes('dapper')) return 'Dapper (ORM)';
    if (
        name.includes('auth') ||
        name.includes('jwt') ||
        name.includes('identity')
    )
        return 'Authentication';
    if (name.includes('cache') || name.includes('caching')) return 'Caching';
    if (
        name.includes('serilog') ||
        name.includes('log') ||
        name.includes('nlog')
    )
        return 'Logging';
    if (
        name.includes('swagger') ||
        name.includes('openapi') ||
        name.includes('swashbuckle')
    )
        return 'Documenting APIs';
    if (
        name.includes('json') ||
        name.includes('newtonsoft') ||
        name.includes('serialization')
    )
        return 'Serialization';
    if (name.includes('http') || name.includes('rest')) return 'HTTP Client';
    if (name.includes('grpc')) return 'gRPC';
    if (name.includes('signalr')) return 'Real-time Communication';
    if (name.includes('automapper')) return 'Mapping';
    if (name.includes('mediatR')) return 'CQRS / Mediator Pattern';
    if (
        name.includes('rabbitmq') ||
        name.includes('kafka') ||
        name.includes('bus')
    )
        return 'Messaging / Eventing';
    if (name.includes('azure') || name.includes('aws') || name.includes('gcp'))
        return 'Cloud Services';
    if (
        name.includes('kubernetes') ||
        name.includes('k8s') ||
        name.includes('helm')
    )
        return 'DevOps / Kubernetes';
    if (
        name.includes('test') ||
        name.includes('xunit') ||
        name.includes('nunit') ||
        name.includes('moq')
    )
        return 'Testing';

    if (name.includes('csv')) return 'CSV Handling';
    if (name.includes('coverlet')) return 'Code Coverage';
    if (name.includes('configuration') || name.includes('dependencyinjection'))
        return 'Configuration';
    if (name.includes('cis') || name.includes('container'))
        return 'Container Image';

    return 'General';
}

main();
