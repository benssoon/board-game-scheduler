export function concatKeysValues(obj) {
    const keys = Object.keys(obj);
    let concatenated = [];
    for (const key in keys) {
        const beforeColon = keys[key]
        const afterColon = obj[beforeColon]
        const msg = `"${beforeColon}" ${afterColon}`;
        concatenated.push(msg);
    }
    return concatenated;
}