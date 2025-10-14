package nl.benzelinsky.fireyleafevents.services;

import nl.benzelinsky.fireyleafevents.dtos.EventInputDto;
import nl.benzelinsky.fireyleafevents.dtos.EventOutputDto;
import nl.benzelinsky.fireyleafevents.exceptions.RecordNotFoundException;
import nl.benzelinsky.fireyleafevents.mappers.EventMapper;
import nl.benzelinsky.fireyleafevents.models.Event;
import nl.benzelinsky.fireyleafevents.models.Game;
import nl.benzelinsky.fireyleafevents.repositories.EventRepository;
import nl.benzelinsky.fireyleafevents.repositories.GameRepository;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final GameRepository gameRepository;

    public EventService(EventRepository eventRepository, GameRepository gameRepository) {
        this.eventRepository = eventRepository;
        this.gameRepository = gameRepository;
    }

    // Create an event
    public EventOutputDto createEvent(EventInputDto dtoIn) {
        Event event = EventMapper.toEntity(dtoIn);
        this.eventRepository.save(event);
        return EventMapper.toOutputDto(event);
    }

    // Get event by ID
    public EventOutputDto getEventById(Long id) {
        return EventMapper.toOutputDto(
                this.eventRepository.findById(id)
                        .orElseThrow(() ->
                                new RecordNotFoundException("Event not found")));

    }

    // Update event by ID
    public EventOutputDto updateEventById(Long id, EventInputDto dtoIn) {
        Event toUpdate = this.eventRepository.findById(id)
                .orElseThrow(() ->
                        new RecordNotFoundException("Event not found."));

        toUpdate.setTitle(dtoIn.title);
        toUpdate.setGame(dtoIn.game);
        toUpdate.setFull(dtoIn.isFull);
        toUpdate.setDefinitiveTime(dtoIn.definitiveTime);
        toUpdate.setPossibleTimes(dtoIn.possibleTimes);
        toUpdate.setPlayers(dtoIn.players);
        toUpdate.setLocation(dtoIn.location);
        toUpdate.setHost(dtoIn.host);

        this.eventRepository.save(toUpdate);
        return EventMapper.toOutputDto(toUpdate);
    }

    // Delete event by ID
    public String deleteEventById(Long id) {
        Event toDelete = this.eventRepository.findById(id)
                .orElseThrow(() ->
                        new RecordNotFoundException("Event not found."));
        this.eventRepository.delete(toDelete);
        return toDelete.getTitle() + " event has been deleted.";
    }

    // Couple Event with Game
    public void assignGameToEvent(Long gameId, Long eventId) {
        Game game = this.gameRepository.findById(gameId)
                .orElseThrow(() ->
                        new RecordNotFoundException("Game not found."));
        Event event = this.eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new RecordNotFoundException("Event not found."));
        event.setGame(game);
        this.eventRepository.save(event);
    }
}
