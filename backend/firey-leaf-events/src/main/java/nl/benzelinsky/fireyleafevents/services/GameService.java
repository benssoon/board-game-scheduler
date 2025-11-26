package nl.benzelinsky.fireyleafevents.services;

import me.xdrop.fuzzywuzzy.FuzzySearch;
import me.xdrop.fuzzywuzzy.model.BoundExtractedResult;
import nl.benzelinsky.fireyleafevents.dtos.GameInputDto;
import nl.benzelinsky.fireyleafevents.dtos.GameOutputDto;
import nl.benzelinsky.fireyleafevents.exceptions.HasActiveEventsException;
import nl.benzelinsky.fireyleafevents.exceptions.RecordNotFoundException;
import nl.benzelinsky.fireyleafevents.mappers.GameMapper;
import nl.benzelinsky.fireyleafevents.models.Event;
import nl.benzelinsky.fireyleafevents.models.Game;
import nl.benzelinsky.fireyleafevents.repositories.EventRepository;
import nl.benzelinsky.fireyleafevents.repositories.GameRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final EventRepository eventRepository;

    public GameService(GameRepository gameRepository, EventRepository eventRepository) {
        this.gameRepository = gameRepository;
        this.eventRepository = eventRepository;
    }

    /****** CRUD operations ******/

    // Create a game
    public GameOutputDto createGame(GameInputDto dtoIn) {
        Game game = GameMapper.toEntity(dtoIn);
        this.gameRepository.save(game);
        return GameMapper.toOutputDto(game);
    }

    // Get game by ID
    public GameOutputDto getGameById(Long id) {
        return GameMapper.toOutputDto(
                this.gameRepository.findById(id)
                        .orElseThrow(() ->
                                new RecordNotFoundException("Game not found with id: " + id)));

    }

    // Get all games, optional title criterium
    public List<GameOutputDto> getAllGames(String title) {
        List<GameOutputDto> allGames = new ArrayList<>();
        if (title != null) {
            // Find and sort all games based on how close the title is to the given search term.
            FuzzySearch.extractSorted(title, this.gameRepository.findAll(), Game::getTitle)
                    .stream()
                    //.filter(result -> result.getScore() >= 60) // Optional, for returning only results with a score higher than 60
                    .map(BoundExtractedResult::getReferent)
                    .toList()
                    .forEach(game ->
                            allGames.add(GameMapper.toOutputDto(game)));
        }
        else {
            this.gameRepository.findAll()
                    .forEach(game ->
                            allGames.add(GameMapper.toOutputDto(game)));
        }
        return allGames;
    }

    // Update game by ID
    public GameOutputDto updateGameById(Long id, GameInputDto dtoIn) {
        Game toUpdate = this.gameRepository.findById(id)
                .orElseThrow(() ->
                        new RecordNotFoundException("Game not found with id: " + id));

        toUpdate.setTitle(dtoIn.title);
        toUpdate.setDescription(dtoIn.description);
        toUpdate.setMinPlayers(dtoIn.minPlayers);
        toUpdate.setMaxPlayers(dtoIn.maxPlayers);
        toUpdate.setComplexity(dtoIn.complexity);
        toUpdate.setMinAge(dtoIn.minAge);
        toUpdate.setMaxAge(dtoIn.maxAge);

        this.gameRepository.save(toUpdate);
        return GameMapper.toOutputDto(toUpdate);
    }

    // Delete game by ID
    public String deleteGameById(Long id) {
        Game toDelete = this.gameRepository.findById(id)
                .orElseThrow(() ->
                        new RecordNotFoundException("Game", id));
        if (!toDelete.getActiveEvents().isEmpty()) {
            List<String> events = new ArrayList<>();
            Map<Long, String> eventIds = new HashMap<>();
            toDelete.getActiveEvents()
                    .forEach(event -> {
                        events.add(event.getName());
                        eventIds.put(event.getId(), event.getName());
                    });
            throw new HasActiveEventsException(id, eventIds);
        }
        else {
            this.gameRepository.delete(toDelete);
        }
        return "Game " + toDelete.getTitle() + " has been deleted.";
    }

    // Delete game by ID including associated events
    // TODO Should only be used with special permission and after checking if sure.
    public String deleteGameAndEvents(Long id) {
        Game toDelete = this.gameRepository.findById(id)
                .orElseThrow(() ->
                        new RecordNotFoundException("Game", id));
        // Iterate over a copy of toDelete.activeEvents to avoid a bug when deleting events from the same collection we're iterating over.
        new ArrayList<>(toDelete.getActiveEvents())
                .forEach(event ->
                        removeEvent(event.getId(), toDelete.getId()));
        this.gameRepository.delete(toDelete);
        return "Game " + toDelete.getTitle() + " has been deleted.";
    }

    // Delete all games
    public String deleteAllGames() {
        Long protectedId = 1L;
        List<Long> toDeleteIds = new ArrayList<>();
        // Create a list of all IDs except for the first one.
        this.gameRepository
                .findAll()
                .forEach(game ->
                        toDeleteIds.add(game.getId()));
        toDeleteIds.remove(protectedId); // Remove ID 1 from the list of all IDs.

        toDeleteIds
                .forEach(id ->
                        System.out.println("\n"+this.deleteGameById(id)+"\n"));
        return "All games except Game with id " + protectedId + " have been deleted.";
    }

    public GameOutputDto removeEvent(Long eventId, Long gameId) {
        Game game = this.gameRepository.findById(gameId)
                .orElseThrow(() ->
                        new RecordNotFoundException("Game", gameId));
        Event event = this.eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new RecordNotFoundException("Event", eventId));
        // TODO add check to see if they are in fact linked?
        game.removeEvent(event);
        event.setGame(null);
        return GameMapper.toOutputDto(game);
    }
}
