package nl.benzelinsky.filogames.exceptions;

public class NotAPlayerException extends RuntimeException {
    public NotAPlayerException() {
        super();
    }
    public NotAPlayerException(String message) {
        super(message);
    }
    public NotAPlayerException(String username, Long eventId) {
        super("User " + username + " is not a player in Event with id: " + eventId);
    }
}
