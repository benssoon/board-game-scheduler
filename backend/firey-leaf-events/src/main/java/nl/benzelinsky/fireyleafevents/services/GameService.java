package nl.benzelinsky.fireyleafevents.services;

import nl.benzelinsky.fireyleafevents.dtos.GameInputDto;
import nl.benzelinsky.fireyleafevents.dtos.GameOutputDto;
import nl.benzelinsky.fireyleafevents.exceptions.RecordNotFoundException;
import nl.benzelinsky.fireyleafevents.mappers.GameMapper;
import nl.benzelinsky.fireyleafevents.models.Event;
import nl.benzelinsky.fireyleafevents.models.Game;
import nl.benzelinsky.fireyleafevents.repositories.EventRepository;
import nl.benzelinsky.fireyleafevents.repositories.GameRepository;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final EventRepository eventRepository;

    public GameService(GameRepository gameRepository, EventRepository eventRepository) {
        this.gameRepository = gameRepository;
        this.eventRepository = eventRepository;
    }

    /****** CRUD operations ******/

    // Create an game
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
                                new RecordNotFoundException("Game not found")));

    }

    // Update game by ID
    public GameOutputDto updateGameById(Long id, GameInputDto dtoIn) {
        Game toUpdate = this.gameRepository.findById(id)
                .orElseThrow(() ->
                        new RecordNotFoundException("Game not found."));

        toUpdate.setTitle(dtoIn.title);
        toUpdate.setDescription(dtoIn.description);
        toUpdate.setMinPlayers(dtoIn.minPlayers);
        toUpdate.setMaxPlayers(dtoIn.maxPlayers);
        toUpdate.setComplexity(dtoIn.complexity);
        toUpdate.setMinAge(dtoIn.minAge);
        toUpdate.setMaxAge(dtoIn.maxAge);
        toUpdate.setActiveEvents(dtoIn.activeEvents);

        this.gameRepository.save(toUpdate);
        return GameMapper.toOutputDto(toUpdate);
    }

    // Delete game by ID
    public String deleteGameById(Long id) {
        Game toDelete = this.gameRepository.findById(id)
                .orElseThrow(() ->
                        new RecordNotFoundException("Game not found."));
        this.gameRepository.delete(toDelete);
        return "Game " + toDelete.getTitle() + " has been deleted.";
    }
}
