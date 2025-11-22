package nl.benzelinsky.fireyleafevents.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public class EventInputDto {

    @NotBlank
    public String title;
    public boolean isFull;
    @NotNull
    public boolean isHostPlaying;
    @NotBlank
    public String location;

    public LocalDateTime definitiveTime;

    // Relations
    public List<LocalDateTime> possibleTimes;
}
