package nl.benzelinsky.fireyleafevents.services;

import nl.benzelinsky.fireyleafevents.dtos.EventInputDto;
import nl.benzelinsky.fireyleafevents.dtos.EventOutputDto;
import nl.benzelinsky.fireyleafevents.exceptions.*;
import nl.benzelinsky.fireyleafevents.mappers.EventMapper;
import nl.benzelinsky.fireyleafevents.models.Event;
import nl.benzelinsky.fireyleafevents.models.Game;
import nl.benzelinsky.fireyleafevents.models.User;
import nl.benzelinsky.fireyleafevents.repositories.EventRepository;
import nl.benzelinsky.fireyleafevents.repositories.GameRepository;
import nl.benzelinsky.fireyleafevents.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;

@ExtendWith(MockitoExtension.class)
class EventServiceTest {

    @Mock // Mock the repository layer.
    EventRepository eventRepository;
    @Mock
    UserRepository userRepository;
    @Mock
    GameRepository gameRepository;

    @InjectMocks // Inject the repository into the service layer.
    EventService eventService;

    private User player1;
    private User player2;
    private User player3;
    private User player4;
    private User userNotInEvent;
    private Event event;
    private Game game1;
    private Game game2;
    private EventInputDto dtoIn;
    private Event createdEvent;

    @BeforeEach
    public void setup() {
        this.player1 = new User("waterman", "1234", "Kyle", "waterman@root.root");
        this.player2 = new User("ben", "1234", "Ben", "ben@ben.ben");
        this.player3 = new User("piet", "1234", "Piet", "piet@piet.piet");
        this.player4 = new User("sint", "1234", "Klaas", "sint@nico.laas");
        this.userNotInEvent = new User("bob", "1234", "Bob", "bob@bob.bob");
        this.event = new Event("Root night");
        this.game1 = new Game("Root", 2, 4);
        this.game2 = new Game("Arcs");
        this.dtoIn = new EventInputDto("Fun night", true, "Erehwon", 1L, LocalDateTime.parse("2025-12-31T23:59:59"), List.of());
        this.createdEvent = new Event(1L, "Fun night", false, false, false, LocalDateTime.parse("2025-12-31T23:59:59"), "Erehwon", List.of(), List.of(), game1, player1);
    }

    @Test
    @DisplayName("Should create event")
    public void testCreateEvent() {
        //arrange
        Long eventId = 1L;
        String username = player1.getUsername();
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(player1));
        Mockito.when(gameRepository.findById(anyLong())).thenReturn(Optional.of(game1));
        Mockito.when(gameRepository.save(any())).thenAnswer(inp -> {
            Event e = inp.getArgument(0);
            e.setId(eventId);
            return e;
        });

        //act
        EventOutputDto dtoOut = this.eventService.createEvent(dtoIn, username);

        //assert
        assertEquals(eventId, dtoOut.id);
    }

    @Test
    @DisplayName("Should return all events")
    public void testGetEvents() {
        //arrange
        List<Event> allEvents = Arrays.asList(this.event, new Event("Arcs"),new Event("Fort"));
        allEvents.forEach(e -> {
            e.setGame(game1);
            e.setHost(player1);
        });

        Mockito.when(eventRepository.findAll()).thenReturn(allEvents);

        //act
        List<EventOutputDto> dtoEvents = this.eventService.getAllEvents(null);

        //assert
        allEvents.forEach(e -> {
            EventOutputDto dto = dtoEvents.get(allEvents.indexOf(e));
            assertEquals(e.getId(), dto.id);
            assertEquals(e.getName(), dto.name);
            assertEquals(e.getGame().getTitle(), dto.game);
            assertEquals(e.isFull(), dto.isFull);
            assertEquals(e.isReadyToStart(), dto.isReadyToStart);
            assertEquals(e.isHostPlaying(), dto.isHostPlaying);
            assertEquals(e.getDefinitiveTime(), dto.definitiveTime);
            assertEquals(e.getHost().getName(), dto.host);
            assertEquals(e.getLocation(), dto.location);
            assertEquals(e.getPossibleTimes(), dto.possibleTimes);
            e.getPlayers().forEach(p -> {
                int pIndex = e.getPlayers().indexOf(p);
                assertEquals(e.getName(), dto.players.get(pIndex));
            });

        });
    }

    @Test
    @DisplayName("Should return all events with requested game")
    public void testGetEventsByGame() {
        //arrange
        Long gameId = 1L;
        List<Event> allEvents = new ArrayList<>();
        allEvents.add(this.event);
        allEvents.add(new Event("Arcs"));
        allEvents.add(new Event("Fort"));
        allEvents.forEach(e -> {
            e.setGame(game1);
            e.setHost(player1);
        });
        allEvents.add(new Event("Not in results"));
        allEvents.getLast().setGame(game2);
        allEvents.getLast().setHost(player1);
        EventOutputDto notInResults = EventMapper.toOutputDto(allEvents.getLast());

        List<Event> eventsWithMatchingGame = new ArrayList<>();
        allEvents.forEach(e -> {
            if (e.getGame().getTitle().equals(game1.getTitle())) {
                eventsWithMatchingGame.add(e);
            }
        });

        Mockito.when(gameRepository.existsById(gameId)).thenReturn(true);
        Mockito.when(eventRepository.findEventsByGame_Id(anyLong())).thenReturn(eventsWithMatchingGame);

        //act
        List<EventOutputDto> dtoEvents = this.eventService.getAllEvents(gameId);

        //assert
        dtoEvents.forEach(dto -> {
            Event e = allEvents.get(dtoEvents.indexOf(dto));
            assertEquals(e.getId(), dto.id);
            assertEquals(e.getName(), dto.name);
            assertEquals(e.getGame().getTitle(), dto.game);
            assertEquals(e.isFull(), dto.isFull);
            assertEquals(e.isReadyToStart(), dto.isReadyToStart);
            assertEquals(e.isHostPlaying(), dto.isHostPlaying);
            assertEquals(e.getDefinitiveTime(), dto.definitiveTime);
            assertEquals(e.getHost().getName(), dto.host);
            assertEquals(e.getLocation(), dto.location);
            assertEquals(e.getPossibleTimes(), dto.possibleTimes);
            e.getPlayers().forEach(p -> {
                int pIndex = e.getPlayers().indexOf(p);
                assertEquals(e.getName(), dto.players.get(pIndex));
            });
        });
        assertFalse(dtoEvents.contains(notInResults));
    }

    @Test
    @DisplayName("Should throw RecordNotFoundException")
    public void testEventsByNonExistingGame() {
        //arrange
        Long gameId = 1L;
        List<Event> allEvents = Arrays.asList(this.event, new Event("Arcs"),new Event("Fort"));
        allEvents.forEach(e -> {
            e.setGame(game1);
            e.setHost(player1);
        });

        //act
        RecordNotFoundException exception = assertThrowsExactly(RecordNotFoundException.class, () -> this.eventService.getAllEvents(gameId));

        //assert
        assertEquals("Game not found with id: " + gameId, exception.getMessage());
    }

    @Test
    @DisplayName("Should get correct event")
    public void testGetEvent() {
        //arrange
        Long eventId = 1L;
        event.setId(eventId);
        event.setGame(game1);
        event.setHost(player1);
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event));

        //act
        EventOutputDto dto = eventService.getEventById(eventId);

        //assert
        assertEquals(eventId, dto.id);
        assertEquals(event.getName(), dto.name);
        assertEquals(event.getGame().getTitle(), dto.game);
        assertEquals(event.isFull(), dto.isFull);
        assertEquals(event.isReadyToStart(), dto.isReadyToStart);
        assertEquals(event.isHostPlaying(), dto.isHostPlaying);
        assertEquals(event.getDefinitiveTime(), dto.definitiveTime);
        assertEquals(event.getHost().getName(), dto.host);
        assertEquals(event.getLocation(), dto.location);
        assertEquals(event.getPossibleTimes(), dto.possibleTimes);
        event.getPlayers().forEach(p -> {
            int pIndex = event.getPlayers().indexOf(p);
            assertEquals(event.getName(), dto.players.get(pIndex));
        });
    }

    @Test
    @DisplayName("Should add correct user to event")
    public void testAddUserToEvent() {
        //arrange (given)
        event.setGame(game1);
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(player1));
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event));

        //act (when)
        EventOutputDto eventOutputDto = eventService.addPlayer("waterman", 1L);

        //assert (then)
        assertEquals(player1.getName(), eventOutputDto.players.getLast());
    }

    @Test
    @DisplayName("Should throw RecordNotFoundException")
    public void testThrowEventException() {
        //arrange
        Long id = 1L;
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.empty());

        //act
        RecordNotFoundException exception = assertThrowsExactly(RecordNotFoundException.class, () -> eventService.addPlayer("waterman", id));

        //assert
        assertEquals("Event not found with id: " + id, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw UsernameNotFoundException")
    public void testThrowPlayerException() {
        //arrange
        String username = userNotInEvent.getUsername();
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event));
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.empty());

        //act
        UsernameNotFoundException exception = assertThrowsExactly(UsernameNotFoundException.class, () -> eventService.addPlayer(username, 1L));

        //assert
        assertThrowsExactly(UsernameNotFoundException.class, () -> eventService.addPlayer(username, 1L));
        assertEquals("Cannot find user " + username, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw UserAlreadyJoinedEventException")
    public void testThrowAlreadyJoinedException() {
        //arrange
        String username = player1.getUsername();
        Long id = 1L;
        event.setGame(game1);
        event.addPlayer(player1);
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event));
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(player1));

        //act
        UserAlreadyJoinedEventException exception = assertThrowsExactly(UserAlreadyJoinedEventException.class, () -> eventService.addPlayer(username, id));

        //assert
        assertThrowsExactly(UserAlreadyJoinedEventException.class, () -> eventService.addPlayer(username, id));
        assertEquals("User with username \"" + username + "\" has already joined Event with id: " + id, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw EventFullException")
    public void testThrowEventFullException() {
        //arrange
        String username = userNotInEvent.getUsername();
        Long id = 1L;
        event.setGame(game1);
        event.addPlayer(player1);
        event.addPlayer(player2);
        event.addPlayer(player3);
        event.addPlayer(player4);
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event));
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(userNotInEvent));

        //act
        EventFullException exception = assertThrowsExactly(EventFullException.class, () -> eventService.addPlayer(username, id));

        //assert
        assertThrowsExactly(EventFullException.class, () -> eventService.addPlayer(username, id));
        assertEquals("The event \"" + event.getName() + "\" is already full.", exception.getMessage());
    }

}