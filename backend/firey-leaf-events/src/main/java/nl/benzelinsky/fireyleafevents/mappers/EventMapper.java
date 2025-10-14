package nl.benzelinsky.fireyleafevents.mappers;

import nl.benzelinsky.fireyleafevents.dtos.EventInputDto;
import nl.benzelinsky.fireyleafevents.dtos.EventOutputDto;
import nl.benzelinsky.fireyleafevents.models.Event;

public class EventMapper {

    public static Event toEntity(EventInputDto dtoIn) {
        Event event = new Event();

        event.setTitle(dtoIn.title);
        event.setGame(dtoIn.game);
        event.setFull(dtoIn.isFull);
        event.setDefinitiveTime(dtoIn.definitiveTime);
        event.setPossibleTimes(dtoIn.possibleTimes);
        event.setPlayers(dtoIn.players);
        event.setLocation(dtoIn.location);
        event.setHost(dtoIn.host);

        return event;
    }

    public static EventOutputDto toOutputDto(Event event) {
        EventOutputDto dtoOut = new EventOutputDto();

        dtoOut.id = event.getId();
        dtoOut.title = event.getTitle();
        dtoOut.game = event.getGame();
        dtoOut.isFull = event.isFull();
        dtoOut.definitiveTime = event.getDefinitiveTime();
        dtoOut.possibleTimes = event.getPossibleTimes();
        dtoOut.players = event.getPlayers();
        dtoOut.location = event.getLocation();
        dtoOut.host = event.getHost();

        return dtoOut;
    }
}
