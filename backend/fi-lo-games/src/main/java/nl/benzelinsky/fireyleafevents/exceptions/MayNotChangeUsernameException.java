package nl.benzelinsky.fireyleafevents.exceptions;

public class MayNotChangeUsernameException extends RuntimeException {
    public MayNotChangeUsernameException() {
        super("You are not allowed to change your username.");
    }
}
