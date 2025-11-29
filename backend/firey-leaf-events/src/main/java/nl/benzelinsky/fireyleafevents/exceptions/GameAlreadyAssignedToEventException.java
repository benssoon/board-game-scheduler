package nl.benzelinsky.fireyleafevents.exceptions;

import lombok.NoArgsConstructor;
import nl.benzelinsky.fireyleafevents.models.Event;
import nl.benzelinsky.fireyleafevents.models.Game;

@NoArgsConstructor
public class GameAlreadyAssignedToEventException extends RuntimeException {
    public GameAlreadyAssignedToEventException(String message) {
        super(message);
    }
    public GameAlreadyAssignedToEventException(Game game, Event event) {
        super("Game with id " + game.getId() + " is already associated with Event with id: " + event.getId());
    }
}
