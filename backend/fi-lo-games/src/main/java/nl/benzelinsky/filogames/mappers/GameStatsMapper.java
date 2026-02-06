package nl.benzelinsky.filogames.mappers;

import nl.benzelinsky.filogames.dtos.GameStatsDto;
import nl.benzelinsky.filogames.models.GameStats;

public class GameStatsMapper {

    public static GameStats toEntity(GameStatsDto dto) {
        GameStats stats = new GameStats();

        stats.setPlayCount(dto.playCount);
        stats.setPlaysWithMaxPlayers(dto.playsWithMaxPlayers);

        return stats;
    }

    public static GameStatsDto toDto(GameStats stats) {
        GameStatsDto dto = new GameStatsDto();

        dto.id = stats.getId();
        dto.playCount = stats.getPlayCount();
        dto.playsWithMaxPlayers = stats.getPlaysWithMaxPlayers();

        return dto;
    }
}
