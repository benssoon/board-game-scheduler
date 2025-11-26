package nl.benzelinsky.fireyleafevents.exceptions;

import nl.benzelinsky.fireyleafevents.models.Event;

import java.util.List;
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
}
