package nl.benzelinsky.filogames.exceptions;

import java.util.Map;

public class HasActiveEventsException extends RuntimeException {
    public HasActiveEventsException() {
        super();
    }
    public HasActiveEventsException(String message) {
        super(message);
    }
    public HasActiveEventsException(Long id, Map<Long, String> activeEvents) {
        super("Game with id " + id + " still has active events:\n" +
                activeEvents.toString() +
                "\nPlease remove those events before removing this game.");
    }
    public HasActiveEventsException(String username, Map<Long, String> activeEvents) {
        super("User with username " + username + " is currently hosting events:\n" +
                activeEvents.toString() +
                "\nPlease remove those events before removing this user.");
    }
}
