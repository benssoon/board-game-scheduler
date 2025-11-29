package nl.benzelinsky.fireyleafevents.services;

import lombok.extern.slf4j.Slf4j;
import nl.benzelinsky.fireyleafevents.dtos.EventInputDto;
import nl.benzelinsky.fireyleafevents.dtos.EventOutputDto;
import nl.benzelinsky.fireyleafevents.dtos.PatchEventInputDto;
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

@Slf4j
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

    private Long eventId;
    private Long gameId;
    private String usernamePlayer1;
    private User player1;
    private User player2;
    private User player3;
    private User player4;
    private User userNotInEvent;
    private Event event1;
    private Event event2;
    private Event event3;
    private Game game1;
    private Game game2;
    private EventInputDto dtoIn;
    private PatchEventInputDto patchDtoInFull;
    private PatchEventInputDto patchDtoInEmpty;
    private String eventNotFoundMessage;
    private String gameNotFoundMessage;
    private String userAlreadyJoinedMessage;
    private String eventFullMessage;
    private String userNotFoundMessage;
    private String eventDeletedMessage;
    private String allEventsDeletedMessage;
    private String gameAlreadyAssignedMessage;
    private String userAlreadyHostingMessage;

    @BeforeEach
    public void setup() {
        this.player1 = new User("waterman", "1234", "Kyle", "waterman@root.root");
        this.player2 = new User("ben", "1234", "Ben", "ben@ben.ben");
        this.player3 = new User("piet", "1234", "Piet", "piet@piet.piet");
        this.player4 = new User("sint", "1234", "Klaas", "sint@nico.laas");
        this.userNotInEvent = new User("bob", "1234", "Bob", "bob@bob.bob");
        this.event1 = new Event("Root night");
        this.event2 = new Event("Arcs night");
        this.event3 = new Event("Game night");
        this.game1 = new Game("Root", 2, 4);
        this.game2 = new Game("Arcs");
        this.dtoIn = new EventInputDto("Fun night", true, "Erehwon", 1L, LocalDateTime.parse("2025-12-31T23:59:59"), List.of());
        this.patchDtoInFull = new PatchEventInputDto("Fun night", true, "Erehwon", LocalDateTime.parse("2025-12-31T23:59:59"));
        this.patchDtoInEmpty = new PatchEventInputDto();
        eventId = 1L;
        gameId = 1L;
        usernamePlayer1 = player1.getUsername();
        eventNotFoundMessage = "Event not found with id: " + eventId;
        gameNotFoundMessage = "Game not found with id: " + gameId;
        userAlreadyJoinedMessage = "User with username \"" + usernamePlayer1 + "\" has already joined Event with id: " + eventId;
        eventFullMessage = "The event \"" + event1.getName() + "\" is already full.";
        userNotFoundMessage = "Cannot find user ";
        eventDeletedMessage = "Event with id " + eventId + " has been deleted.";
        allEventsDeletedMessage = "All events except Event with id " + eventId + " have been deleted.";
        gameAlreadyAssignedMessage = "Game with id " + gameId + " is already associated with Event with id: " + eventId;
        userAlreadyHostingMessage = "User with username " + usernamePlayer1 + " is already hosting event with id: " + eventId;
    }

    @Test
    @DisplayName("Should create event")
    public void testCreateEvent() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(player1));
        Mockito.when(gameRepository.findById(anyLong())).thenReturn(Optional.of(game1));
        Mockito.when(eventRepository.save(any())).thenAnswer(invocation -> {
            Event e = invocation.getArgument(0);
            e.setId(eventId);
            return e;
        });

        //act
        EventOutputDto dtoOut = this.eventService.createEvent(dtoIn, usernamePlayer1);

        //assert
        assertEquals(eventId, dtoOut.id);
        assertEquals(dtoIn.name, dtoOut.name);
        assertEquals(dtoIn.isHostPlaying, dtoOut.isHostPlaying);
        assertEquals(dtoIn.location, dtoOut.location);
        assertEquals(game1.getTitle(), dtoOut.game);
        assertEquals(dtoIn.definitiveTime, dtoOut.definitiveTime);
        assertEquals(dtoIn.possibleTimes, dtoOut.possibleTimes);
    }

    @Test
    @DisplayName("Should return event with host not playing")
    public void testHostNotPlaying() {
        //arrange
        EventInputDto dtoHostNotPlaying = dtoIn;
        dtoHostNotPlaying.isHostPlaying = false;
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(player1));
        Mockito.when(gameRepository.findById(anyLong())).thenReturn(Optional.of(game1));
        Mockito.when(eventRepository.save(any())).thenAnswer(inp -> {
            Event e = inp.getArgument(0);
            e.setId(eventId);
            return e;
        });

        //act
        EventOutputDto dtoOutHostNotPlaying = this.eventService.createEvent(dtoHostNotPlaying, usernamePlayer1);

        //assert
        assertFalse(dtoOutHostNotPlaying.players.contains(player1.getName()));
    }

    @Test
    @DisplayName("Should throw RecordNotFoundException")
    public void testCreateEventWithNonExistingGame() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(player1));

        //act
        RecordNotFoundException exception = assertThrowsExactly(RecordNotFoundException.class, () -> this.eventService.createEvent(dtoIn, usernamePlayer1));

        //assert
        assertEquals(gameNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw UsernameNotFoundException")
    public void testCreateEventThrowsUsernameNotFoundException() {
        //arrange
        String nonUsername = userNotInEvent.getUsername();

        //act
        UsernameNotFoundException exception = assertThrowsExactly(UsernameNotFoundException.class, () -> eventService.createEvent(dtoIn, nonUsername));

        //assert
        assertEquals(userNotFoundMessage + nonUsername, exception.getMessage());
    }

    @Test
    @DisplayName("Should return all events")
    public void testGetEvents() {
        //arrange
        List<Event> allEvents = Arrays.asList(this.event1, new Event("Arcs"),new Event("Fort"));
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
        List<Event> allEvents = new ArrayList<>();
        allEvents.add(this.event1);
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
    public void testGetEventsByNonExistingGame() {
        //arrange
        List<Event> allEvents = Arrays.asList(this.event1, new Event("Arcs"),new Event("Fort"));
        allEvents.forEach(e -> {
            e.setGame(game1);
            e.setHost(player1);
        });

        //act
        RecordNotFoundException exception = assertThrowsExactly(RecordNotFoundException.class, () -> this.eventService.getAllEvents(gameId));

        //assert
        assertEquals(gameNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should get correct event")
    public void testGetEvent() {
        //arrange
        event1.setId(eventId);
        event1.setGame(game1);
        event1.setHost(player1);
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event1));

        //act
        EventOutputDto dto = eventService.getEventById(eventId);

        //assert
        assertEquals(eventId, dto.id);
        assertEquals(event1.getName(), dto.name);
        assertEquals(event1.getGame().getTitle(), dto.game);
        assertEquals(event1.isFull(), dto.isFull);
        assertEquals(event1.isReadyToStart(), dto.isReadyToStart);
        assertEquals(event1.isHostPlaying(), dto.isHostPlaying);
        assertEquals(event1.getDefinitiveTime(), dto.definitiveTime);
        assertEquals(event1.getHost().getName(), dto.host);
        assertEquals(event1.getLocation(), dto.location);
        assertEquals(event1.getPossibleTimes(), dto.possibleTimes);
        event1.getPlayers().forEach(p -> {
            int pIndex = event1.getPlayers().indexOf(p);
            assertEquals(event1.getName(), dto.players.get(pIndex));
        });
    }

    @Test
    @DisplayName("Should throw RecordNotFoundException")
    public void testGetEventThrowRecordNotFoundException() {
        //arrange
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.empty());

        //act
        RecordNotFoundException exception = assertThrowsExactly(RecordNotFoundException.class, () -> eventService.getEventById(eventId));

        //assert
        assertEquals(eventNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should return event with all new data")
    public void testUpdateEvent() {
        //arrange
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event1));
        event1.setGame(game1);
        EventOutputDto testDto = EventMapper.toOutputDto(event1);

        // change event to testDto because event is already set to what is expected
        testDto.name = patchDtoInFull.name;
        testDto.isHostPlaying = patchDtoInFull.isHostPlaying;
        testDto.definitiveTime = patchDtoInFull.definitiveTime;
        testDto.location = patchDtoInFull.location;

        //act
        EventOutputDto dto = eventService.updateEventById(eventId, patchDtoInFull);

        //assert
        assertEquals(testDto.id, dto.id);
        assertEquals(testDto.name, dto.name);
        assertEquals(testDto.game, dto.game);
        assertEquals(testDto.isFull, dto.isFull);
        assertEquals(testDto.isReadyToStart, dto.isReadyToStart);
        assertEquals(testDto.isHostPlaying, dto.isHostPlaying);
        assertEquals(testDto.definitiveTime, dto.definitiveTime);
        assertEquals(testDto.possibleTimes, dto.possibleTimes);
        assertEquals(testDto.players, dto.players);
        assertEquals(testDto.location, dto.location);
        assertEquals(testDto.host, dto.host);
    }

    @Test
    @DisplayName("Should return event with no data changed")
    public void testDoNotUpdateEvent() {
        //arrange
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event1));
        event1.setGame(game1);
        EventOutputDto testDto = EventMapper.toOutputDto(event1);

        //act
        EventOutputDto dto = eventService.updateEventById(eventId, patchDtoInEmpty);

        //assert
        assertEquals(testDto.id, dto.id);
        assertEquals(testDto.name, dto.name);
        assertEquals(testDto.game, dto.game);
        assertEquals(testDto.isFull, dto.isFull);
        assertEquals(testDto.isReadyToStart, dto.isReadyToStart);
        assertEquals(testDto.isHostPlaying, dto.isHostPlaying);
        assertEquals(testDto.definitiveTime, dto.definitiveTime);
        assertEquals(testDto.possibleTimes, dto.possibleTimes);
        assertEquals(testDto.players, dto.players);
        assertEquals(testDto.location, dto.location);
        assertEquals(testDto.host, dto.host);
    }

    @Test
    @DisplayName("Should throw RecordNotFoundException")
    public void testUpdateEventThrowsRecordNotFoundException() {
        //arrange
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.empty());

        //act
        RecordNotFoundException exception = assertThrowsExactly(RecordNotFoundException.class, () -> eventService.updateEventById(eventId, patchDtoInEmpty));

        //assert
        assertEquals(eventNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should delete the correct event")
    public void testDeleteEventById() {
        //arrange
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event1));

        //act
        String message = eventService.deleteEventById(eventId);

        //assert
        assertEquals(eventDeletedMessage, message);
    }

    @Test
    @DisplayName("Should remove all players from event")
    public void testDeletingEventRemovesPlayers() {
        //arrange
        Mockito.when(eventRepository.findById(eventId)).thenReturn(Optional.of(event1));
        Mockito.when(userRepository.findById(player1.getUsername())).thenReturn(Optional.of(player1));
        Mockito.when(userRepository.findById(player2.getUsername())).thenReturn(Optional.of(player2));
        Mockito.when(userRepository.findById(player3.getUsername())).thenReturn(Optional.of(player3));
        Mockito.when(userRepository.findById(player4.getUsername())).thenReturn(Optional.of(player4));
        event1.setId(eventId);
        event1.setGame(game1);
        event1.addPlayer(player1);
        event1.addPlayer(player2);
        event1.addPlayer(player3);
        event1.addPlayer(player4);

        //act
        eventService.deleteEventById(eventId);

        //assert
        assertTrue(event1.getPlayers().isEmpty());
    }

    @Test
    @DisplayName("Should throw RecordNotFoundException")
    public void testDeleteEventThrowsRecordNotFound() {
        //arrange
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.empty());

        //act
        RecordNotFoundException exception = assertThrowsExactly(RecordNotFoundException.class, () -> eventService.deleteEventById(eventId));

        //assert
        assertEquals(eventNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should delete all events except protected")
    public void testDeleteAllEvents() {
        //arrange
        List<Event> allEvents = new ArrayList<>();
        allEvents.add(event1);
        allEvents.add(event2);
        allEvents.add(event3);
        event1.setId(1L);
        event2.setId(2L);
        event3.setId(3L);
        Mockito.when(eventRepository.findAll()).thenReturn(allEvents);
        Mockito.when(eventRepository.findById(event2.getId())).thenReturn(Optional.of(event2));
        Mockito.when(eventRepository.findById(event3.getId())).thenReturn(Optional.of(event3));
        Mockito.doAnswer(invocation ->
        {
            Event e = invocation.getArgument(0);
            allEvents.remove(e);
            return e;
        }).when(eventRepository).delete(any());

        //act
        String message = eventService.deleteAllEvents();

        //assert
        assertEquals(allEventsDeletedMessage, message);
        assertEquals(1, allEvents.size());
        assertEquals(allEvents.getFirst(), event1);
        assertEquals(allEvents.getLast(), event1);
    }

    @Test
    @DisplayName("Should return event with newly added game and remove event from previous game's activeEvents")
    public void testAssignGameToEvent() {
        //arrange
        event1.setGame(game1);
        game1.addEvent(event1);
        Mockito.when(gameRepository.findById(anyLong())).thenReturn(Optional.of(game2));
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event1));

        //act
        EventOutputDto dto = eventService.assignGameToEvent(eventId, gameId);

        //assert
        assertFalse(game1.getActiveEvents().contains(event1));
        assertEquals(event1.getGame(), game2);
        assertTrue(game2.getActiveEvents().contains(event1));
        assertEquals(game2.getTitle(), dto.game);
    }

    @Test
    @DisplayName("Should throw GameAlreadyAssignedToEventException")
    public void testReassignGameToEvent() {
        //arrange
        event1.setGame(game1);
        game1.addEvent(event1);
        event1.setId(eventId);
        game1.setId(gameId);
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event1));
        Mockito.when(gameRepository.findById(anyLong())).thenReturn(Optional.of(game1));

        //act
        GameAlreadyAssignedToEventException exception = assertThrowsExactly(GameAlreadyAssignedToEventException.class, () -> eventService.assignGameToEvent(gameId, eventId));

        //assert
        assertEquals(gameAlreadyAssignedMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw RecordNotFoundException")
    public void testAssignGameToNonExistingEvent() {
        //arrange
        Mockito.when(gameRepository.findById(anyLong())).thenReturn(Optional.of(game1));

        //act
        RecordNotFoundException exception = assertThrowsExactly(RecordNotFoundException.class, () -> eventService.assignGameToEvent(gameId, eventId));

        //assert
        assertEquals(eventNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw RecordNotFoundException")
    public void testAssignNonExistingGameToEvent() {
        //arrange

        //act
        RecordNotFoundException exception = assertThrowsExactly(RecordNotFoundException.class, () -> eventService.assignGameToEvent(gameId, eventId));

        //assert
        assertEquals(gameNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should return event with new host assigned")
    public void testAssignHostToEvent() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(player2));
        Mockito.when(eventRepository.findById(eventId)).thenReturn(Optional.of(event1));
        event1.setGame(game1);
        event1.setHost(player1);
        player1.hostEvent(event1);

        //act
        EventOutputDto dto = eventService.assignHostToEvent(usernamePlayer1, eventId);

        //assert
        assertEquals(event1.getHost(), player2);
        assertTrue(player2.getHostedEvents().contains(event1));
        assertFalse(player1.getHostedEvents().contains(event1));
    }

    @Test
    @DisplayName("Should throw AlreadyHostingException")
    public void testReassignHostToEvent() {
        //arrange
        event1.setId(eventId);
        event1.setGame(game1);
        event1.setHost(player1);
        player1.hostEvent(event1);
        event1.setId(eventId);
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(player1));
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event1));

        //act
        AlreadyHostingException exception = assertThrowsExactly(AlreadyHostingException.class, () -> eventService.assignHostToEvent(usernamePlayer1, eventId));

        //assert
        assertEquals(userAlreadyHostingMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw RecordNotFoundException")
    public void testAssignHostToNonExistingEvent() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(player1));

        //act
        RecordNotFoundException exception = assertThrowsExactly(RecordNotFoundException.class, () -> eventService.assignHostToEvent(usernamePlayer1, eventId));

        //assert
        assertEquals(eventNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw UsernameNotFoundException")
    public void testAssignNonExistingHostToEvent() {
        //arrange

        //act
        UsernameNotFoundException exception = assertThrowsExactly(UsernameNotFoundException.class, () -> eventService.assignHostToEvent(usernamePlayer1, eventId));

        //assert
        assertEquals(userNotFoundMessage + usernamePlayer1, exception.getMessage());
    }

    @Test
    @DisplayName("Should add correct user to event")
    public void testAddPlayer() {
        //arrange (given)
        event1.setGame(game1);
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(player1));
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event1));

        //act (when)
        EventOutputDto eventOutputDto = eventService.addPlayer("waterman", 1L);

        //assert (then)
        assertEquals(player1.getName(), eventOutputDto.players.getLast());
    }

    @Test
    @DisplayName("Should throw RecordNotFoundException")
    public void testAddPlayerThrowsRecordNotFoundException() {
        //arrange
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.empty());

        //act
        RecordNotFoundException exception = assertThrowsExactly(RecordNotFoundException.class, () -> eventService.addPlayer(usernamePlayer1, eventId));

        //assert
        assertEquals(eventNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw UsernameNotFoundException")
    public void testThrowPlayerException() {
        //arrange
        String nonUsername = userNotInEvent.getUsername();
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event1));
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.empty());

        //act
        UsernameNotFoundException exception = assertThrowsExactly(UsernameNotFoundException.class, () -> eventService.addPlayer(nonUsername, 1L));

        //assert
        assertThrowsExactly(UsernameNotFoundException.class, () -> eventService.addPlayer(nonUsername, 1L));
        assertEquals("Cannot find user " + nonUsername, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw UserAlreadyJoinedEventException")
    public void testThrowAlreadyJoinedException() {
        //arrange
        event1.setGame(game1);
        event1.addPlayer(player1);
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event1));
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(player1));

        //act
        UserAlreadyJoinedEventException exception = assertThrowsExactly(UserAlreadyJoinedEventException.class, () -> eventService.addPlayer(usernamePlayer1, eventId));

        //assert
        assertThrowsExactly(UserAlreadyJoinedEventException.class, () -> eventService.addPlayer(usernamePlayer1, eventId));
        assertEquals(userAlreadyJoinedMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw EventFullException")
    public void testThrowEventFullException() {
        //arrange
        String username = userNotInEvent.getUsername();
        Long id = 1L;
        event1.setGame(game1);
        event1.addPlayer(player1);
        event1.addPlayer(player2);
        event1.addPlayer(player3);
        event1.addPlayer(player4);
        Mockito.when(eventRepository.findById(anyLong())).thenReturn(Optional.of(event1));
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(userNotInEvent));

        //act
        EventFullException exception = assertThrowsExactly(EventFullException.class, () -> eventService.addPlayer(username, id));

        //assert
        assertThrowsExactly(EventFullException.class, () -> eventService.addPlayer(username, id));
        assertEquals(eventFullMessage, exception.getMessage());
    }

}