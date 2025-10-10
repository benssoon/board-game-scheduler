package nl.benzelinsky.fireyleafevents.dtos;

import nl.benzelinsky.fireyleafevents.models.Game;
import nl.benzelinsky.fireyleafevents.models.Host;
import nl.benzelinsky.fireyleafevents.models.Participant;

import java.time.LocalDateTime;
import java.util.List;

public class EventOutputDto {
    public Long id;
    public String title;
    public Game game;
    public boolean isFull;
    public LocalDateTime definitiveTime;
    public List<LocalDateTime> possibleTimes;
    public List<Participant> players;
    public String location;
    public Host host;
}
