package nl.benzelinsky.fireyleafevents.dtos;

import java.time.LocalDateTime;
import java.util.List;

public class EventOutputDto {
    public Long id;
    public String title;
    public String game;
    public boolean isFull;
    public boolean isHostPlaying;
    public LocalDateTime definitiveTime;
    public List<LocalDateTime> possibleTimes;
    public List<String> players;
    public String location;
    public String host;
}
