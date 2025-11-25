package nl.benzelinsky.fireyleafevents.services;

import me.xdrop.fuzzywuzzy.FuzzySearch;
import me.xdrop.fuzzywuzzy.model.BoundExtractedResult;
import nl.benzelinsky.fireyleafevents.dtos.GameInputDto;
import nl.benzelinsky.fireyleafevents.dtos.GameOutputDto;
import nl.benzelinsky.fireyleafevents.exceptions.RecordNotFoundException;
import nl.benzelinsky.fireyleafevents.mappers.GameMapper;
import nl.benzelinsky.fireyleafevents.models.Game;
import nl.benzelinsky.fireyleafevents.repositories.GameRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameService {

    private final GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
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
                        new RecordNotFoundException("Game not found with id: " + id));
        this.gameRepository.delete(toDelete);
        return "Game " + toDelete.getTitle() + " has been deleted.";
    }
}
