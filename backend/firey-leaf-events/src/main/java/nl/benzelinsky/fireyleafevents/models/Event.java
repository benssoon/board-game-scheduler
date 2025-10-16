package nl.benzelinsky.fireyleafevents.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private boolean isFull;
    private LocalDateTime definitiveTime;
    /* This needs to be changed to a relation. */private List<LocalDateTime> possibleTimes;
    private String location;
    // Relations:

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToMany(mappedBy = "joinedEvents")
    private List<Participant> players;

    @ManyToOne
    @JoinColumn(name = "host_id")
    private Host host;

    // Getters and setters


    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Host getHost() {
        return host;
    }

    public void setHost(Host host) {
        this.host = host;
    }


    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Long getId() {
        return this.id;
    }

    public boolean isFull() {
        return this.isFull;
    }

    public void setFull(boolean full) {
        isFull = full;
    }

    public LocalDateTime getDefinitiveTime() {
        return this.definitiveTime;
    }

    public void setDefinitiveTime(LocalDateTime definitiveScheduledTime) {
        this.definitiveTime = definitiveScheduledTime;
    }

    public List<LocalDateTime> getPossibleTimes() {
        return this.possibleTimes;
    }

    public void setPossibleTimes(List<LocalDateTime> possibleTimes) {
        this.possibleTimes = possibleTimes;
    }

    public List<Participant> getPlayers() {
        return this.players;
    }

    public void setPlayers(List<Participant> players) {
        this.players = players;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
