package nl.benzelinsky.fireyleafevents.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Host extends Participant {

    private String address;
    @OneToMany(mappedBy = "host")
    private List<Event> openEvents;
    @ManyToMany
    @JoinTable(
            name = "owned_games",
            joinColumns = @JoinColumn(name = "host_id"),
            inverseJoinColumns = @JoinColumn(name = "game_id")
    )
    private List<Game> gameCollection;

    // Getters and setters
    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Event> getOpenEvents() {
        return this.openEvents;
    }

    public void setOpenEvents(List<Event> openEvents) {
        this.openEvents = openEvents;
    }

    public List<Game> getGameCollection() {
        return this.gameCollection;
    }

    public void setGameCollection(List<Game> gameCollection) {
        this.gameCollection = gameCollection;
    }
}
