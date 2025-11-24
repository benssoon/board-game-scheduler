package nl.benzelinsky.fireyleafevents.exceptions;

public class UserAlreadyJoinedEvent extends RuntimeException {
    public UserAlreadyJoinedEvent() {
        super();
    }
    public UserAlreadyJoinedEvent(String username, Long eventId) {
        super("User with username \"" + username + "\" has already joined Event with id: " + eventId);
    }
}
