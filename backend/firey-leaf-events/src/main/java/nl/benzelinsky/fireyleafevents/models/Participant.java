package nl.benzelinsky.fireyleafevents.models;

import jakarta.persistence.*;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@Entity
public class Participant extends User {

    private int age;
    String area;
    @ManyToMany
    @JoinTable(
            name = "favorite_games",
            joinColumns = @JoinColumn(name = "participant_id"),
            inverseJoinColumns = @JoinColumn(name = "game_id")
    )
    private List<Game> favoriteGames;
    @ManyToMany
    @JoinTable(
            name = "player_events",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "participant_id")
    )
    private List<Event> joinedEvents;

    // Getters and setters

    public int getAge() {
        return this.age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getArea() {
        return this.area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public List<Game> getFavoriteGames() {
        return this.favoriteGames;
    }

    public void setFavoriteGames(List<Game> favoriteGames) {
        this.favoriteGames = favoriteGames;
    }

    public List<Event> getJoinedEvents() {
        return this.joinedEvents;
    }

    public void setJoinedEvents(List<Event> joinedEvents) {
        this.joinedEvents = joinedEvents;
    }
}
