const fs = require('fs');
const path = require('path');

const componentsDir = 'd:\\JavaScript\\private_projects\\element-plus-react\\src\\components';
const docsDir = 'd:\\JavaScript\\private_projects\\element-plus-react\\docs\\components';

const results = [];

function extractPropsFromTypeScript(filePath) {
    const props = [];

    try {
        const content = fs.readFileSync(filePath, 'utf-8');

        const interfaceMatches = content.match(/export interface (\w+)Props[^}]+}/g);

        if (interfaceMatches) {
            interfaceMatches.forEach(match => {
                const interfaceName = match.match(/export interface (\w+)Props/)?.[1];
                if (!interfaceName) {
                    return;
                }

                const lines = match.split('\n');

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('/**')) {
                        const comment = trimmed;
                        const nextLineIndex = lines.indexOf(line) + 1;
                        if (nextLineIndex < lines.length) {
                            const nextLine = lines[nextLineIndex].trim();
                            const nameMatch = nextLine.match(/^(\w+)\s*[?:]/);
                            if (nameMatch) {
                                props.push({
                                    interface: interfaceName,
                                    name: nameMatch[1],
                                    description: comment.replace(/\/\*\*|\*\//g, '').trim(),
                                });
                            }
                        }
                    }
                }
            });
        }
    } catch (e) {
        console.error(`Error reading ${filePath}:`, e.message);
    }

    return props;
}

function extractPropsFromMarkdown(filePath) {
    const props = [];

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');

        let inTable = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.includes('| 属性名') || line.includes('| 插槽名')) {
                inTable = true;
                i++;
                continue;
            }

            if (inTable && line.trim().startsWith('|')) {
                if (line.includes('---')) {
                    continue;
                }

                const parts = line.split('|').map(p => p.trim());
                if (parts.length >= 2) {
                    const propName = parts[1];
                    if (propName && propName !== '属性名' && propName !== '插槽名' && !propName.startsWith('<!--')) {
                        props.push(propName);
                    }
                }
            } else if (inTable && !line.trim().startsWith('|')) {
                inTable = false;
            }
        }
    } catch (e) {
        console.error(`Error reading ${filePath}:`, e.message);
    }

    return props;
}

function getComponentNames() {
    const names = [];
    const dirs = fs.readdirSync(componentsDir, { withFileTypes: true });

    dirs.forEach(dir => {
        if (dir.isDirectory()) {
            const name = dir.name.toLowerCase();
            const docPath = path.join(docsDir, name, 'index.md');
            const typePath = path.join(componentsDir, dir.name, 'typings.ts');

            if (fs.existsSync(docPath) && fs.existsSync(typePath)) {
                names.push({
                    componentName: dir.name,
                    docName: name,
                    typePath,
                    docPath,
                });
            }
        }
    });

    return names;
}

function compareComponent(component) {
    const typeProps = extractPropsFromTypeScript(component.typePath);
    const docProps = extractPropsFromMarkdown(component.docPath);

    const typePropNames = typeProps.map(p => p.name);
    const docPropNames = docProps;

    const missingInDoc = typePropNames.filter(p => !docPropNames.includes(p));
    const extraInDoc = docPropNames.filter(p => !typePropNames.includes(p));

    return {
        component: component.componentName,
        typeProps: typePropNames.length,
        docProps: docPropNames.length,
        missingInDoc,
        extraInDoc,
        typePropsDetail: typeProps,
    };
}

function main() {
    console.log('='.repeat(100));
    console.log('API Documentation vs TypeScript Types Comparison');
    console.log('='.repeat(100));
    console.log('');

    const components = getComponentNames();

    components.forEach(comp => {
        const result = compareComponent(comp);
        results.push(result);

        console.log(`[${comp.componentName}]`);
        console.log(`  Type props: ${result.typeProps}`);
        console.log(`  Doc props: ${result.docProps}`);

        if (result.missingInDoc.length > 0) {
            console.log(`  Missing in doc: ${result.missingInDoc.join(', ')}`);
        }

        if (result.extraInDoc.length > 0) {
            console.log(`  Extra in doc: ${result.extraInDoc.join(', ')}`);
        }

        console.log('');
    });

    console.log('='.repeat(100));
    console.log('Summary');
    console.log('='.repeat(100));

    let totalMissing = 0;
    let totalExtra = 0;

    results.forEach(r => {
        totalMissing += r.missingInDoc.length;
        totalExtra += r.extraInDoc.length;
    });

    console.log(`Total components checked: ${results.length}`);
    console.log(`Total missing props in docs: ${totalMissing}`);
    console.log(`Total extra props in docs: ${totalExtra}`);
    console.log('');

    console.log('Components with missing props:');
    results
        .filter(r => r.missingInDoc.length > 0)
        .forEach(r => {
            console.log(`  ${r.component}: ${r.missingInDoc.length} missing`);
        });

    console.log('');
    console.log('Components with extra props:');
    results
        .filter(r => r.extraInDoc.length > 0)
        .forEach(r => {
            console.log(`  ${r.component}: ${r.extraInDoc.length} extra`);
        });

    console.log('');

    const detailedReport = results.map(r => ({
        component: r.component,
        missing: r.missingInDoc,
        extra: r.extraInDoc,
    }));

    fs.writeFileSync('d:\\JavaScript\\private_projects\\element-plus-react\\api-comparison-report.json', JSON.stringify(detailedReport, null, 2));
    console.log('Detailed report saved to: api-comparison-report.json');
}

main();
