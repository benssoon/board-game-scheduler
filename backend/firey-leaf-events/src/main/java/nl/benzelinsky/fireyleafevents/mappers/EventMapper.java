package nl.benzelinsky.fireyleafevents.mappers;

import nl.benzelinsky.fireyleafevents.dtos.EventInputDto;
import nl.benzelinsky.fireyleafevents.dtos.EventOutputDto;
import nl.benzelinsky.fireyleafevents.models.Event;

public class EventMapper {

    public static Event toEntity(EventInputDto inputDto) {
        Event event = new Event();

        event.setTitle(inputDto.title);
        event.setGame(inputDto.game);
        event.setFull(inputDto.isFull);
        event.setDefinitiveTime(inputDto.definitiveTime);
        event.setPossibleTimes(inputDto.possibleTimes);
        event.setPlayers(inputDto.players);
        event.setLocation(inputDto.location);
        event.setHost(inputDto.host);

        return event;
    }

    public static EventOutputDto toOutputDto(Event event) {
        EventOutputDto outputDto = new EventOutputDto();

        outputDto.id = event.getId();
        outputDto.title = event.getTitle();
        outputDto.game = event.getGame();
        outputDto.isFull = event.isFull();
        outputDto.definitiveTime = event.getDefinitiveTime();
        outputDto.possibleTimes = event.getPossibleTimes();
        outputDto.players = event.getPlayers();
        outputDto.location = event.getLocation();
        outputDto.host = event.getHost();

        return outputDto;
    }
}
