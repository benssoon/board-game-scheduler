package nl.benzelinsky.filogames.exceptions;

import lombok.NoArgsConstructor;
import nl.benzelinsky.filogames.models.Event;
import nl.benzelinsky.filogames.models.User;

@NoArgsConstructor
public class AlreadyHostingException extends RuntimeException {
    public AlreadyHostingException(String message) {
        super(message);
    }
    public AlreadyHostingException(User host, Event event) {
        super("User with username " + host.getUsername() + " is already hosting event with id: " + event.getId());
    }
}
