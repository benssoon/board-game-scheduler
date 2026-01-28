package nl.benzelinsky.fireyleafevents.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import nl.benzelinsky.fireyleafevents.models.Game;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
public class EventInputDto {

    @NotBlank
    @Size(min = 3, max = 128)
    public String name;
    @Size(min = 12, max = 1024)
    public String description;
    @NotNull
    public Boolean isHostPlaying;
    @NotBlank
    @Size(min = 3, max = 128)
    public String location;
    @NotNull
    public Long gameId;

    public LocalDateTime definitiveTime;

    // Relations
    public List<LocalDateTime> possibleTimes;
}
