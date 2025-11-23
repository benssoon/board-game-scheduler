package nl.benzelinsky.fireyleafevents.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private boolean isFull;
    private boolean isHostPlaying;
    private LocalDateTime definitiveTime;
    /* This needs to be changed to a relation. */private List<LocalDateTime> possibleTimes = new ArrayList<>();
    private String location;
    // Relations:

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToMany(mappedBy = "joinedEvents")
    private List<User> players = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "host_username")
    private User host;

    // Methods
    public void addPlayer(User player) {
        this.players.add(player);
    }
    public void removePlayer(User player) {
        this.players.remove(player);
    }
}