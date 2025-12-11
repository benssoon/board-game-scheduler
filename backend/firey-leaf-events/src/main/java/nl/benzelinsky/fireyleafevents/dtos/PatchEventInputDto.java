package nl.benzelinsky.fireyleafevents.dtos;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
public class PatchEventInputDto {
    public String name;
    public String description;
    public Boolean isHostPlaying;
    public String location;
    public LocalDateTime definitiveTime;

    public PatchEventInputDto(String name) {
        this.name = name;
    }

    public PatchEventInputDto(Boolean isHostPlaying) {
        this.isHostPlaying = isHostPlaying;
    }
}