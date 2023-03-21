import fs from 'node:fs';

class FileError extends Error {
    constructor(message: string, public cause?: Error) {
        super(message);
        this.name = 'FileError';
    }
}

const fileCache = new Map<string, string>();

export const json = (file: string, encoding: BufferEncoding = 'utf8') => {
    try {
        if (!fs.existsSync(file)) return {};

        return JSON.parse(fs.readFileSync(file, encoding));
    } catch (e) {
        throw new FileError(`Could not read file: ${file}`, e);
    }
};

export const set = (file: string, key: string | Symbol, value: any, encoding: BufferEncoding = 'utf8') => {
    try {
        const data = json(file);

        data[String(key)] = value;

        if (value === null) delete data[String(key)];

        fs.writeFileSync(file, JSON.stringify(data, null, 4), encoding);
    } catch (e) {
        throw new FileError(`Could not write to file: ${file}`, e);
    }
};

export const stream = (file: string, encoding: BufferEncoding = 'utf8') => {
    let data: { [x: string | symbol]: any };

    if (fileCache[file]) {
        data = fileCache[file];
    } else {
        data = json(file);
        fileCache[file] = data;
    }

    return new Proxy(
        {},
        {
            get: (_, prop) => {
                if (prop === '__filename') return file;
                if (prop === '__data') return data || json(file, encoding);

                return data[prop] || json(file, encoding)[prop];
            },
            set: (_, prop, value) => {
                data[prop] = value;
                set(file, prop, value, encoding);
                return true;
            },
            deleteProperty(_, prop) {
                delete data[prop];
                set(file, prop, null, encoding);
                return true;
            },
        }
    );
};
