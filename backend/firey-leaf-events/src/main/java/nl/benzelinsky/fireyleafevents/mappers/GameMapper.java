package nl.benzelinsky.fireyleafevents.mappers;

import nl.benzelinsky.fireyleafevents.dtos.GameInputDto;
import nl.benzelinsky.fireyleafevents.dtos.GameOutputDto;
import nl.benzelinsky.fireyleafevents.models.Game;

public class GameMapper {
    public static Game toEntity(GameInputDto inputDto) {
        Game game = new Game();

        game.setTitle(inputDto.title);
        game.setDescription(inputDto.description);
        game.setMinPlayers(inputDto.minPlayers);
        game.setMaxPlayers(inputDto.maxPlayers);
        game.setComplexity(inputDto.complexity);
        game.setMinAge(inputDto.minAge);
        game.setMaxAge(inputDto.maxAge);
        game.setActiveEvents(inputDto.activeEvents);

        return game;
    }

    public static GameOutputDto toOutputDto(Game game) {
        GameOutputDto outputDto = new GameOutputDto();

        outputDto.id = game.getId();
        outputDto.title = game.getTitle();
        outputDto.description = game.getDescription();
        outputDto.minPlayers = game.getMinPlayers();
        outputDto.maxPlayers = game.getMaxPlayers();
        outputDto.complexity = game.getComplexity();
        outputDto.minAge = game.getMinAge();
        outputDto.maxAge = game.getMaxAge();
        outputDto.activeEvents = game.getActiveEvents();

        return outputDto;
    }
}
