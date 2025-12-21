package nl.benzelinsky.fireyleafevents.mappers;

import nl.benzelinsky.fireyleafevents.dtos.EventInputDto;
import nl.benzelinsky.fireyleafevents.dtos.EventOutputDto;
import nl.benzelinsky.fireyleafevents.dtos.TinyEventOutputDto;
import nl.benzelinsky.fireyleafevents.models.Event;

import java.util.ArrayList;
import java.util.List;

public class EventMapper {

    public static Event toEntity(EventInputDto inputDto) {
        Event event = new Event();

        event.setName(inputDto.name);
        event.setDescription(inputDto.description);
        event.setHostPlaying(inputDto.isHostPlaying);
        event.setDefinitiveTime(inputDto.definitiveTime);
        event.setPossibleTimes(inputDto.possibleTimes);
        event.setLocation(inputDto.location);

        return event;
    }

    public static EventOutputDto toOutputDto(Event event) {
        EventOutputDto outputDto = new EventOutputDto();

        outputDto.id = event.getId();
        outputDto.name = event.getName();
        outputDto.description = event.getDescription();
        outputDto.game = GameMapper.toOutputDto(event.getGame());
        outputDto.isFull = event.isFull();
        outputDto.isReadyToStart = event.isReadyToStart();
        outputDto.isHostPlaying = event.isHostPlaying();
        outputDto.definitiveTime = event.getDefinitiveTime();
        outputDto.possibleTimes = event.getPossibleTimes();
        List<String> players = new ArrayList<>();
        event.getPlayers().forEach((player) -> players.add(player.getUsername()));
        outputDto.players = players;
        outputDto.location = event.getLocation();
        outputDto.host = UserMapper.toTinyDto(event.getHost());

        return outputDto;
    }

    public static TinyEventOutputDto toTinyDto(Event event) {
        TinyEventOutputDto outputDto = new TinyEventOutputDto();

        outputDto.id = event.getId();
        outputDto.name = event.getName();

        return outputDto;
    }
}
