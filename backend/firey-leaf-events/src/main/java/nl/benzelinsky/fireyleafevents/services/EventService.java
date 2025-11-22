package nl.benzelinsky.fireyleafevents.services;

import nl.benzelinsky.fireyleafevents.dtos.EventInputDto;
import nl.benzelinsky.fireyleafevents.dtos.EventOutputDto;
import nl.benzelinsky.fireyleafevents.exceptions.RecordNotFoundException;
import nl.benzelinsky.fireyleafevents.mappers.EventMapper;
import nl.benzelinsky.fireyleafevents.models.Event;
import nl.benzelinsky.fireyleafevents.models.Game;
import nl.benzelinsky.fireyleafevents.models.User;
import nl.benzelinsky.fireyleafevents.repositories.EventRepository;
import nl.benzelinsky.fireyleafevents.repositories.GameRepository;
import nl.benzelinsky.fireyleafevents.repositories.UserRepository;
import nl.benzelinsky.fireyleafevents.utils.JwtUtil;

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
                                new RecordNotFoundException("User not found with username: " + username));
        event.setHost(host);
        event.addPlayer(host);
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
    public EventOutputDto updateEventById(Long id, EventInputDto dtoIn) {
        Event toUpdate = this.eventRepository.findById(id)
                .orElseThrow(() ->
                        new RecordNotFoundException("Event not found with id: " + id));

        toUpdate.setTitle(dtoIn.title);
        toUpdate.setFull(dtoIn.isFull);
        toUpdate.setDefinitiveTime(dtoIn.definitiveTime);
        toUpdate.setPossibleTimes(dtoIn.possibleTimes);
        toUpdate.setLocation(dtoIn.location);

        this.eventRepository.save(toUpdate);
        return EventMapper.toOutputDto(toUpdate);
    }

    // Delete event by ID
    public String deleteEventById(Long id) {
        Event toDelete = this.eventRepository.findById(id)
                .orElseThrow(() ->
                        new RecordNotFoundException("Event not found with id: " + id));
        this.eventRepository.delete(toDelete);
        return toDelete.getTitle() + " event has been deleted.";
    }

    // Delete all events (besides default event)
    public String deleteAll() {
        List<Long> allIds = new ArrayList<>();
        this.eventRepository
                .findAll()
                .forEach(event ->
                        allIds.add(event.getId()));
        allIds.remove(Long.valueOf(1));
        this.eventRepository.deleteAllById(allIds);
        return "All events except " + this.eventRepository.getEventById(Long.valueOf(1)).getTitle() + " have been deleted.";
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
        this.eventRepository.save(event);
    }

    // Add host to Event
    public void assignHostToEvent(String username, Long eventId) {
        User host = this.userRepository.findById(username)
                .orElseThrow(() ->
                        new RecordNotFoundException("User not found with username: " + username));
        Event event = this.eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new RecordNotFoundException("Event not found with id: " + eventId));
        event.setHost(host);
        this.eventRepository.save(event);
    }

    // Add player to Event
    public void addPlayer(Long eventId, String username) {
        Event event = this.eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new RecordNotFoundException("Event not found with id: " + eventId));
        User player = this.userRepository.findById(username)
                .orElseThrow(() ->
                        new RecordNotFoundException("User not found with id: " + username));
        event.addPlayer(player);
        this.eventRepository.save(event);
    }
}
