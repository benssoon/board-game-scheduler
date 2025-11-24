package nl.benzelinsky.fireyleafevents.mappers;

import nl.benzelinsky.fireyleafevents.dtos.GameInputDto;
import nl.benzelinsky.fireyleafevents.dtos.GameOutputDto;
import nl.benzelinsky.fireyleafevents.models.Game;

import java.util.ArrayList;
import java.util.List;

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
        List<String> activeEvents = new ArrayList<>();
        game.getActiveEvents().forEach((event) -> activeEvents.add(event.getName()));
        outputDto.activeEvents = activeEvents;

        return outputDto;
    }
}
