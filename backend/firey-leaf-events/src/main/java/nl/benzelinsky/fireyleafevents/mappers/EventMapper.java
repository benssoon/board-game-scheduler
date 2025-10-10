package nl.benzelinsky.fireyleafevents.mappers;

import nl.benzelinsky.fireyleafevents.dtos.EventInputDto;
import nl.benzelinsky.fireyleafevents.dtos.EventOutputDto;
import nl.benzelinsky.fireyleafevents.models.Event;

public class EventMapper {

    public static Event toEntity(EventInputDto eventInputDto) {
        Event event = new Event();

        event.setTitle(eventInputDto.title);
        event.setGame(eventInputDto.game);
        event.setFull(eventInputDto.isFull);
        event.setDefinitiveTime(eventInputDto.definitiveTime);
        event.setPossibleTimes(eventInputDto.possibleTimes);
        event.setPlayers(eventInputDto.players);
        event.setLocation(eventInputDto.location);
        event.setHost(eventInputDto.host);

        return event;
    }

    public static EventOutputDto toOutputDto(Event event) {
        EventOutputDto eventOutputDto = new EventOutputDto();

        eventOutputDto.id = event.getId();
        eventOutputDto.title = event.getTitle();
        eventOutputDto.game = event.getGame();
        eventOutputDto.isFull = event.isFull();
        eventOutputDto.definitiveTime = event.getDefinitiveTime();
        eventOutputDto.possibleTimes = event.getPossibleTimes();
        eventOutputDto.players = event.getPlayers();
        eventOutputDto.location = event.getLocation();
        eventOutputDto.host = event.getHost();

        return eventOutputDto;
    }
}
