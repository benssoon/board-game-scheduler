package nl.benzelinsky.fireyleafevents.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import nl.benzelinsky.fireyleafevents.models.Game;
import nl.benzelinsky.fireyleafevents.models.Host;
import nl.benzelinsky.fireyleafevents.models.Participant;

import java.time.LocalDateTime;
import java.util.List;

public class EventInputDto {

    @NotBlank
    public String title;
    public Game game;

    @NotNull
    public boolean isFull;

    public LocalDateTime definitiveTime;
    public List<LocalDateTime> possibleTimes;
    public List<Participant> players;
    public String location;
    public Host host;
}
