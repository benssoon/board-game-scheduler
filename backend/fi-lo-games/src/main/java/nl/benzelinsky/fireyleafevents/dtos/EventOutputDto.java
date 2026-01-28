package nl.benzelinsky.fireyleafevents.dtos;

import java.time.LocalDateTime;
import java.util.List;

public class EventOutputDto {
    public Long id;
    public String name;
    public String description;
    public GameOutputDto game;
    public Boolean isFull;
    public Boolean isReadyToStart;
    public Boolean isHostPlaying;
    public LocalDateTime definitiveTime;
    public List<LocalDateTime> possibleTimes;
    public List<String> players; // TODO Is this the best way to prevent recursion?
    public String location;
    public TinyUserOutputDto host;
}
