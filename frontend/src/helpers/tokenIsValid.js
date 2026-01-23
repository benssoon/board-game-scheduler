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

    /*if (token.sub === currentUsername) {
        console.log(`${currentUsername} is still logged in.`);
        isCurrentUser = true;
    } else {
        console.log(`${currentUsername} is not logged in.`)
        isCurrentUser = false;
    }*/

    return !(isExpired || !isCurrentUser);
}