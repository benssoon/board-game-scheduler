package nl.benzelinsky.filogames.dtos;

import java.util.List;

public class TinyUserOutputDto {
    public String username;
    public String name;
    public String area;
    public List<TinyEventOutputDto> hostedEvents;
    public List<TinyEventOutputDto> joinedEvents;
}
