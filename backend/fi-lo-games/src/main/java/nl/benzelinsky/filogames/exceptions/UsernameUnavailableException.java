package nl.benzelinsky.filogames.exceptions;

public class UsernameUnavailableException extends RuntimeException {
    public UsernameUnavailableException() {
        super();
    }

    public UsernameUnavailableException(String username) {
        super("Username \"" + username + "\" is already taken.");
    }
}
