package nl.benzelinsky.fireyleafevents.services;

import nl.benzelinsky.fireyleafevents.dtos.EventInputDto;
import nl.benzelinsky.fireyleafevents.dtos.EventOutputDto;
import nl.benzelinsky.fireyleafevents.dtos.PatchEventInputDto;
import nl.benzelinsky.fireyleafevents.exceptions.RecordNotFoundException;
import nl.benzelinsky.fireyleafevents.exceptions.UserAlreadyJoinedEventException;
import nl.benzelinsky.fireyleafevents.exceptions.UsernameNotFoundException;
import nl.benzelinsky.fireyleafevents.mappers.EventMapper;
import nl.benzelinsky.fireyleafevents.models.Event;
import nl.benzelinsky.fireyleafevents.models.Game;
import nl.benzelinsky.fireyleafevents.models.User;
import nl.benzelinsky.fireyleafevents.repositories.EventRepository;
import nl.benzelinsky.fireyleafevents.repositories.GameRepository;
import nl.benzelinsky.fireyleafevents.repositories.UserRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;

    public EventService(EventRepository eventRepository, GameRepository gameRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
    }

    // Create an event
    public EventOutputDto createEvent(EventInputDto dtoIn, String username) {
        Event event = EventMapper.toEntity(dtoIn);
        User host = this.userRepository.findById(username)
                        .orElseThrow(() ->
                                new UsernameNotFoundException(username));
        Long gameId = dtoIn.gameId;
        Game game = this.gameRepository.findById(gameId)
                        .orElseThrow(() ->
                                new RecordNotFoundException("Game not found with id: " + gameId));
        event.setGame(game);
        game.addEvent(event);

        event.setHost(host);
        host.hostEvent(event);

        if (dtoIn.isHostPlaying) {
            host.joinEvent(event);
            event.addPlayer(host);
        }

        this.eventRepository.save(event);
        return EventMapper.toOutputDto(event);
    }

    // Get all events
    public List<EventOutputDto> getAllEvents() {
        List<EventOutputDto> allEvents = new ArrayList<>();
        this.eventRepository.findAll()
                .forEach(event ->
                        allEvents.add(EventMapper.toOutputDto(event)));
        return allEvents;
    }

    // Get event by ID
    public EventOutputDto getEventById(Long id) {
        return EventMapper.toOutputDto(
                this.eventRepository.findById(id)
                        .orElseThrow(() ->
                                new RecordNotFoundException("Event not found with id: " + id)));

    }

    // Update event by ID
    public EventOutputDto updateEventById(Long id, PatchEventInputDto dtoIn) {
        String string = "name";
        Event toUpdate = this.eventRepository.findById(id)
                .orElseThrow(() ->
                        new RecordNotFoundException("Event not found with id: " + id));

        if (dtoIn.name != null) {
            toUpdate.setName(dtoIn.name);
        }
        if (dtoIn.isFull != null) {
            toUpdate.setFull(dtoIn.isFull);
        }
        if (dtoIn.isHostPlaying != null) {
            toUpdate.setHostPlaying(dtoIn.isHostPlaying);
        }
        if (dtoIn.definitiveTime != null) {
            toUpdate.setDefinitiveTime(dtoIn.definitiveTime);
        }
        if (dtoIn.possibleTimes != null) {
            toUpdate.setPossibleTimes(dtoIn.possibleTimes);
        }
        if (dtoIn.location != null) {
            toUpdate.setLocation(dtoIn.location);
        }

        this.eventRepository.save(toUpdate);
        return EventMapper.toOutputDto(toUpdate);
    }

    // Delete event by ID
    public String deleteEventById(Long id) {
        Event toDelete = this.eventRepository.findById(id)
                .orElseThrow(() ->
                        new RecordNotFoundException("Event not found with id: " + id));
        this.eventRepository.delete(toDelete);
        return toDelete.getName() + " event has been deleted.";
    }

    // TODO Make deletes be able to handle decoupling of relations of events.
    // Delete all events (besides default event)
    public String deleteAll() {
        List<Long> allIds = new ArrayList<>();
        this.eventRepository
                .findAll()
                .forEach(event ->
                        allIds.add(event.getId()));
        allIds.remove(Long.valueOf(1));
        this.eventRepository.deleteAllById(allIds);
        return "All events except " + this.eventRepository.getEventById(Long.valueOf(1)).getName() + " have been deleted.";
    }

    // Couple Event with Game
    public void assignGameToEvent(Long gameId, Long eventId) {
        Game game = this.gameRepository.findById(gameId)
                .orElseThrow(() ->
                        new RecordNotFoundException("Game not found with id: " + gameId));
        Event event = this.eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new RecordNotFoundException("Event not found with id: " + eventId));
        event.setGame(game);
        game.addEvent(event);
        this.eventRepository.save(event);
    }

    // Add host to Event
    public void assignHostToEvent(String username, Long eventId) {
        User host = this.userRepository.findById(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(username));
        Event event = this.eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new RecordNotFoundException("Event not found with id: " + eventId));
        event.setHost(host);
        host.hostEvent(event);
        this.eventRepository.save(event);
    }

    /* TODO Add this to the controller */
    /* TODO After that, check other todo's here */
    /* TODO Then, make tests. */
    // Add player to Event
    public EventOutputDto addPlayer(String username, Long eventId) {
        Event event = this.eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new RecordNotFoundException("Event not found with id: " + eventId));
        User player = this.userRepository.findById(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(username));
        if (event.getPlayers().contains(player)) {
            throw new UserAlreadyJoinedEventException(username, eventId);
        }
        event.addPlayer(player);
        player.joinEvent(event);
        this.eventRepository.save(event);
        return EventMapper.toOutputDto(event);
    }
}
