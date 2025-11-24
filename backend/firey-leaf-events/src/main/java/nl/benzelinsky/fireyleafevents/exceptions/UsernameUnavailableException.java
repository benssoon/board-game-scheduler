package nl.benzelinsky.fireyleafevents.exceptions;

public class UsernameUnavailableException extends RuntimeException {
    public UsernameUnavailableException() {
        super();
    }

    public UsernameUnavailableException(String username) {
        super("Username \"" + username + "\" is already taken.");
    }
}
