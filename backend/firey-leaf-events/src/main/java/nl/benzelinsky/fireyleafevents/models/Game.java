package nl.benzelinsky.fireyleafevents.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "games")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private int minPlayers;
    private int maxPlayers;
    private String complexity;
    private int minAge;
    private int maxAge;
    @OneToMany(mappedBy = "game")
    private List<Event> activeEvents;

}
