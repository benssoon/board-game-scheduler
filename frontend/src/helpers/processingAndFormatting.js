export function concatKeysValues(obj) {
    const keys = Object.keys(obj);
    let concatenated = [];
    for (const key in keys) {
        const beforeColon = keys[key]
        const afterColon = obj[beforeColon]
        const msg = `"${beforeColon}": ${afterColon}`;
        concatenated.push(msg);
    }
    return concatenated;
}

export function cleanupData(data) {
    return  Object.fromEntries( // Return an object with empty strings converted to null.
        Object.entries(data).map(([key, value]) => {
                return [key, value === false ? value : value || null]
            }
        )
    );
}