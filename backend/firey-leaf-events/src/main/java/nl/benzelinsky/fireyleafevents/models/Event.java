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

    @Column(nullable = false)
    private boolean isFull;

    @Column(nullable = false)
    private boolean isReadyToStart;

    @Column
    private boolean isHostPlaying;

    @Column
    private LocalDateTime definitiveTime;

    @Column
    private String location;

    // Relations:
    /* TODO This needs to be changed to a relation. */private List<LocalDateTime> possibleTimes = new ArrayList<>();

    @ManyToMany(mappedBy = "joinedEvents")
    private List<User> players = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne
    @JoinColumn(name = "host_username")
    private User host;

    // Methods
    public void addPlayer(User player) {
        this.players.add(player);
        if (this.players.size() == this.game.getMaxPlayers()) {
            this.setFull(true);
        }
        if (this.players.size() == this.game.getMinPlayers()) {
            this.setReadyToStart(true);
        }
    }
    public void removePlayer(User player) {
        this.players.remove(player);
        // Check that the size indeed just went below the max (just to be safe).
        if (this.players.size() == this.game.getMaxPlayers()-1){
            this.setFull(false);
        }
        // Event cannot begin if there are fewer than the minimum number of players.
        if (this.players.size() < this.game.getMinPlayers()) {
            this.setReadyToStart(false);
        }
    }
}