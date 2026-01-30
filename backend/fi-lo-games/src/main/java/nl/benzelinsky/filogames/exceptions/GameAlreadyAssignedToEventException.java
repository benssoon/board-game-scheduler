package nl.benzelinsky.filogames.exceptions;

import lombok.NoArgsConstructor;
import nl.benzelinsky.filogames.models.Event;
import nl.benzelinsky.filogames.models.Game;

@NoArgsConstructor
public class GameAlreadyAssignedToEventException extends RuntimeException {
    public GameAlreadyAssignedToEventException(String message) {
        super(message);
    }
    public GameAlreadyAssignedToEventException(Game game, Event event) {
        super("Game with id " + game.getId() + " is already associated with Event with id: " + event.getId());
    }
}
