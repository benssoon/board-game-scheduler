package nl.benzelinsky.fireyleafevents.dtos;

import java.time.LocalDateTime;

public class PatchEventInputDto {
    public String name;
    public Boolean isHostPlaying;
    public String location;
    public LocalDateTime definitiveTime;
}