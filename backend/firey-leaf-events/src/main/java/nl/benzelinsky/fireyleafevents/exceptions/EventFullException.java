package nl.benzelinsky.fireyleafevents.exceptions;

public class EventFullException extends RuntimeException {
    public EventFullException() {
        super("Event already full.");
    }
    public EventFullException(String eventName) {
        super("The event \"" + eventName + "\" is already full.");
    }
}
