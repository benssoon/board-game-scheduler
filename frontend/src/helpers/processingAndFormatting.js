export function cleanupData(data) {
    console.log(data)
    // Convert possible dates to standard iso format
    if ('possibleTimes' in data) {
        data.possibleTimes = data.possibleTimes.map((datetime) => {
            return datetime.toDate().toISOString();
        });
    }
    return  Object.fromEntries( // Return an object with empty strings converted to null.
        Object.entries(data).map(([key, value]) => {
            // Convert date string to iso string
            value && key === 'definitiveTime' ?
                value = new Date(value).toISOString() :
                null;
            // If value is explicitly false, return false, otherwise null for falsy values
            return [key, value === false ?
                    value :
                    value || null
            ]
        })
    );
}

export function parseDate(date) {
    const dateOptions = {year: "numeric", month: "long", day: "numeric",};
    return new Date(date).toLocaleDateString("en-NL", dateOptions);
}