package nl.benzelinsky.fireyleafevents.exceptions;

import lombok.NoArgsConstructor;
import nl.benzelinsky.fireyleafevents.models.Event;
import nl.benzelinsky.fireyleafevents.models.User;

@NoArgsConstructor
public class AlreadyHostingException extends RuntimeException {
    public AlreadyHostingException(String message) {
        super(message);
    }
    public AlreadyHostingException(User host, Event event) {
        super("User with username " + host.getUsername() + " is already hosting event with id: " + event.getId());
    }
}
