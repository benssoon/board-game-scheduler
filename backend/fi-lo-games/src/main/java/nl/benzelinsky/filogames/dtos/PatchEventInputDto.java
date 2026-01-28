package nl.benzelinsky.filogames.dtos;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class PatchEventInputDto {
    @Size(min = 3, max = 128)
    public String name;
    @Size(min = 12, max = 1024)
    public String description;
    public Boolean isHostPlaying;
    @Size(min = 3, max = 128)
    public String location;
    public LocalDateTime definitiveTime;
    public List<LocalDateTime> possibleTimes;

    public PatchEventInputDto(String name) {
        this.name = name;
    }

    public PatchEventInputDto(Boolean isHostPlaying) {
        this.isHostPlaying = isHostPlaying;
    }
}