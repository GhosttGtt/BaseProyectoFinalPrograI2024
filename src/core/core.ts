import * as fs from 'fs';

const DATA_DIR = './data';

export function readData<T>(filename: string): T[] {
    const path = `${DATA_DIR}/${filename}.json`;
    if (!fs.existsSync(path)) {
        return [];
    }
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data) as T[];
}

export function writeData<T>(filename: string, data: T[]): void {
    const path = `${DATA_DIR}/${filename}.json`;
    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
}