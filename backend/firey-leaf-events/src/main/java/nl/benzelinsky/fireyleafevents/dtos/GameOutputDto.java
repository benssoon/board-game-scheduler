package nl.benzelinsky.fireyleafevents.dtos;

import nl.benzelinsky.fireyleafevents.models.Event;

import java.util.List;

public class GameOutputDto {
    public Long id;
    public String title;
    public String description;
    public int minPlayers;
    public int maxPlayers;
    public String complexity;
    public int minAge;
    public int maxAge;
    public List<Event> activeEvents;
}
