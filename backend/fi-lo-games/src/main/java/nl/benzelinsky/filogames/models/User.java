package nl.benzelinsky.filogames.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(nullable = false, unique = true)
    @NonNull
    private String username;

    @Column(nullable = false)
    @NonNull
    private String password;

    @Column
    @NonNull
    private String name;

    @Column(nullable = false, unique = true)
    @NonNull
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
    private List<Event> hostedEvents = new ArrayList<>();

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
    private List<Event> joinedEvents = new ArrayList<>();

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