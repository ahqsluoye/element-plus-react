const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../src/components');

const COMPONENT_NAMES = [
    'Affix',
    'Alert',
    'Anchor',
    'AnchorLink',
    'Avatar',
    'Backtop',
    'Badge',
    'Breadcrumb',
    'BreadcrumbItem',
    'Button',
    'ButtonGroup',
    'Card',
    'Carousel',
    'CarouselItem',
    'Cascader',
    'Checkbox',
    'CheckboxButton',
    'CheckboxGroup',
    'Col',
    'Collapse',
    'CollapseItem',
    'ColorPicker',
    'ConfigProvider',
    'Container',
    'Countdown',
    'DatePicker',
    'DateTimePicker',
    'Descriptions',
    'DescriptionsItem',
    'Dialog',
    'Divider',
    'Drawer',
    'Dropdown',
    'DropdownItem',
    'DropdownMenu',
    'Empty',
    'Form',
    'FormItem',
    'Icon',
    'Input',
    'InputGroup',
    'InputNumber',
    'Link',
    'Loading',
    'Menu',
    'MenuItem',
    'MenuItemGroup',
    'Message',
    'MessageBox',
    'Notification',
    'PageHeader',
    'Pagination',
    'Popconfirm',
    'Popover',
    'Popper',
    'Progress',
    'Radio',
    'RadioButton',
    'RadioGroup',
    'Scrollbar',
    'Segmented',
    'Select',
    'Option',
    'OptionGroup',
    'Skeleton',
    'SkeletonItem',
    'Slider',
    'Space',
    'Statistic',
    'Steps',
    'Step',
    'Switch',
    'TableColumn',
    'Tabs',
    'TabPane',
    'Tag',
    'Text',
    'TimeLine',
    'TimeLineItem',
    'TimePicker',
    'TimePickerRange',
    'Tooltip',
    'Tour',
    'TourStep',
    'Transfer',
    'Transition',
    'Tree',
    'TreeSelect',
    'Upload',
    'VirtualList',
    'Watermark',
];

function processFile(filePath) {
    const relPath = path.relative(COMPONENTS_DIR, filePath);
    if (relPath === 'index.ts') {
        return;
    }

    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    COMPONENT_NAMES.forEach(componentName => {
        const importPattern = new RegExp(`(import)\\s+(${componentName})\\s+(from)\\s+('[a-zA-Z\\-@/\\.]+')`, 'g');
        content = content.replace(importPattern, (match, importKeyword, alias, fromKeyword, importPath) => {
            modified = true;
            return `${importKeyword} El${alias} ${fromKeyword} ${importPath}`;
        });
        // importPattern = new RegExp(`(import)\\s+(${componentName})\\s+(from)\\s+('@qsxy/element-plus-react/${componentName}/[^']+')`, 'g');
        // content = content.replace(importPattern, (match, importKeyword, alias, fromKeyword, importPath) => {
        //     modified = true;
        //     return `${importKeyword} El${alias} ${fromKeyword} ${importPath}`;
        // });

        const importDefaultPattern = new RegExp(`(import)\\s+(${componentName})\\s+(from)\\s+('@qsxy/element-plus-react/${componentName}')`, 'g');
        content = content.replace(importDefaultPattern, (match, importKeyword, alias, fromKeyword, importPath) => {
            modified = true;
            return `${importKeyword} El${alias} ${fromKeyword} ${importPath}`;
        });

        const jsxPattern = new RegExp(`<${componentName}(\\s|/)`, 'g');
        content = content.replace(jsxPattern, match => {
            modified = true;
            return `<El${componentName}${match.slice(componentName.length + 1)}`;
        });

        const startPattern = new RegExp(`<${componentName}>`, 'g');
        content = content.replace(startPattern, match => {
            modified = true;
            return `<El${componentName}>`;
        });

        const endPattern = new RegExp(`</${componentName}>`, 'g');
        content = content.replace(endPattern, match => {
            modified = true;
            return `</El${componentName}>`;
        });

        // const variablePattern = new RegExp(`\\b${componentName}\\b(?!\\s*(?:extends|implements|from|:|=|,))`, 'g');
        // content = content.replace(variablePattern, (match, offset, str) => {
        //     const prevChar = str[offset - 1];
        //     if (prevChar === '<') {
        //         return match;
        //     }
        //     const beforeMatch = str.substring(Math.max(0, offset - 50), offset);
        //     if (beforeMatch.includes('@qsxy/element-plus-react/')) {
        //         return match;
        //     }
        //     modified = true;
        //     return `El${componentName}`;
        // });
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Modified: ${filePath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (file !== 'hooks' && file !== 'Util' && file !== 'types' && file !== 'config') {
                walk(filePath);
            }
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                processFile(filePath);
            }
        }
    });
}

console.log('Starting component import renaming...');
walk(COMPONENTS_DIR);
console.log('Done!');
