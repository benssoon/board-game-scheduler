export function tokenIsValid(token, currentUsername) {
    console.log(token)
    console.log(currentUsername)
    let isExpired;
    let isCurrentUser = true;

    if (Date.now() / 1000 < token.exp) {
        console.log("Token is not expired.");
        isExpired = false;
    } else {
        console.log('Token is expired.');
        isExpired = true;
    }

    return !(isExpired || !isCurrentUser);
}