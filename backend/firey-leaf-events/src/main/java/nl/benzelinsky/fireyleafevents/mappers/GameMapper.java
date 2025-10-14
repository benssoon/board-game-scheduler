package nl.benzelinsky.fireyleafevents.mappers;

import nl.benzelinsky.fireyleafevents.dtos.GameInputDto;
import nl.benzelinsky.fireyleafevents.dtos.GameOutputDto;
import nl.benzelinsky.fireyleafevents.models.Game;

public class GameMapper {
    public static Game toEntity(GameInputDto dtoIn) {
        Game game = new Game();

        game.setTitle(dtoIn.title);
        game.setDescription(dtoIn.description);
        game.setMinPlayers(dtoIn.minPlayers);
        game.setMaxPlayers(dtoIn.maxPlayers);
        game.setComplexity(dtoIn.complexity);
        game.setMinAge(dtoIn.minAge);
        game.setMaxAge(dtoIn.maxAge);
        game.setActiveEvents(dtoIn.activeEvents);

        return game;
    }

    public static GameOutputDto toOutputDto(Game game) {
        GameOutputDto dtoOut = new GameOutputDto();

        dtoOut.id = game.getId();
        dtoOut.title = game.getTitle();
        dtoOut.description = game.getDescription();
        dtoOut.minPlayers = game.getMinPlayers();
        dtoOut.maxPlayers = game.getMaxPlayers();
        dtoOut.complexity = game.getComplexity();
        dtoOut.minAge = game.getMinAge();
        dtoOut.maxAge = game.getMaxAge();
        dtoOut.activeEvents = game.getActiveEvents();

        return dtoOut;
    }
}
