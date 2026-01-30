package nl.benzelinsky.filogames.dtos;

import java.util.List;

public class GameOutputDto {
    public Long id;
    public String title;
    public String description;
    public int minPlayers;
    public int maxPlayers;
    public String complexity;
    public int minAge;
    public int maxAge;
    public List<TinyEventOutputDto> activeEvents; // Should this not include the event id rather than the event title?
}
