package nl.benzelinsky.filogames.dtos;

import jakarta.validation.constraints.*;

public class GameInputDto {

    @NotBlank
    @Size(min = 3, max = 128)
    public String title;

    @Size(min = 12, max = 1024)
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
}
