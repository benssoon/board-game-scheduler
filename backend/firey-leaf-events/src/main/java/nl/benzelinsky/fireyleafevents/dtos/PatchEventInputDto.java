package nl.benzelinsky.fireyleafevents.dtos;

import java.time.LocalDateTime;
import java.util.List;

public class PatchEventInputDto {
    public String name;
    public Boolean isFull;
    public Boolean isHostPlaying;
    public String location;
    public LocalDateTime definitiveTime;
    public List<LocalDateTime> possibleTimes;
}
