package nl.benzelinsky.filogames.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "games")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false)
    @NonNull
    private String title;

    @Column
    private String description;

    @Column
    private int minPlayers;

    @Column
    private int maxPlayers;

    @Column
    private String complexity;

    @Column
    private int minAge;

    @Column
    private int maxAge;

    @OneToMany(mappedBy = "game")
    private List<Event> activeEvents = new ArrayList<>();

    // Constructor
    public Game(String title, int minPlayers, int maxPlayers) {
        this.title = title;
        this.minPlayers = minPlayers;
        this.maxPlayers = maxPlayers;
    }

    // Methods
    public void addEvent(Event event) {
        this.activeEvents.add(event);
    }
    public void removeEvent(Event event) {
        this.activeEvents.remove(event);
    }
}