package nl.benzelinsky.fireyleafevents.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(nullable = false, unique = true)
    private String username;

    @Column
    private String password;

    @Column
    private String apiKey;

    @Column
    private String name;

    @Column
    private String emailAddress;

    @Column
    private String telephoneNumber;

    @Column
    private int age;

    @Column
    private String area;

    @Column
    private String address;

    @OneToMany(mappedBy = "host")
    private List<Event> hostedEvents;

    @ManyToMany
    @JoinTable(
            name = "owned_games",
            joinColumns = @JoinColumn(name = "username"),
            inverseJoinColumns = @JoinColumn(name = "game_id")
    )
    private List<Game> gameCollection;

    @ManyToMany
    @JoinTable(
            name = "favorite_games",
            joinColumns = @JoinColumn(name = "username"),
            inverseJoinColumns = @JoinColumn(name = "game_id")
    )
    private List<Game> favoriteGames;

    @ManyToMany
    @JoinTable(
            name = "player_events",
            joinColumns = @JoinColumn(name = "username"),
            inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    private List<Event> joinedEvents;

    @OneToMany(
            targetEntity = Role.class,
            mappedBy = "username",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.EAGER)
    private Set<Role> roles = new HashSet<>();


    public void addRole(Role role) {
        this.roles.add(role);
    }
    public void removeRole(Role role) {
        this.roles.remove(role);
    }
    public void joinEvent(Event event) {
        this.joinedEvents.add(event);
    }
    public void leaveEvent(Event event) {
        this.joinedEvents.remove(event);
    }
    public void hostEvent(Event event) {
        this.hostedEvents.add(event);
    }
    public void stopHostingEvent(Event event) {
        this.hostedEvents.remove(event);
    }
}