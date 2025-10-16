package nl.benzelinsky.fireyleafevents.dtos;

import jakarta.validation.constraints.*;
import nl.benzelinsky.fireyleafevents.models.Event;

import java.util.List;

public class GameInputDto {

    @NotBlank
    @Size(min = 3, max = 128)
    public String title;

    @Size(min = 32, max = 256)
    public String description;

    @Positive
    public int minPlayers;

    @Positive
    @Max(10)
    public int maxPlayers;

    @Size(min = 8, max = 32)
    public String complexity;

    @Positive
    public int minAge;

    @Positive
    public int maxAge;

    public List<Event> activeEvents;
}
