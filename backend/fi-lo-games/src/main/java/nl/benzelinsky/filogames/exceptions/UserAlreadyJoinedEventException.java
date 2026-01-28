package nl.benzelinsky.filogames.exceptions;

public class UserAlreadyJoinedEventException extends RuntimeException {
    public UserAlreadyJoinedEventException() {
        super();
    }
    public UserAlreadyJoinedEventException(String username, Long eventId) {
        super("User with username \"" + username + "\" has already joined Event with id: " + eventId);
    }
}
