package nl.benzelinsky.fireyleafevents.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import nl.benzelinsky.fireyleafevents.models.Game;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
public class EventInputDto {

    @NotBlank
    public String name;
    @NotNull
    public Boolean isHostPlaying;
    @NotBlank
    public String location;
    @NotNull
    public Long gameId;

    public LocalDateTime definitiveTime;

    // Relations
    public List<LocalDateTime> possibleTimes;
}
