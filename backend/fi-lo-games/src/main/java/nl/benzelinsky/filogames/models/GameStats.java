package nl.benzelinsky.filogames.models;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "game_stats")
public class GameStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @NonNull
    @Column
    private Integer playCount;

    @NonNull
    @Column
    private Integer playsWithMaxPlayers;

    @OneToOne(mappedBy = "stats")
    private Game game;

    // Constructor
    public GameStats(Game game) {
        this.playCount = 0;
        this.playsWithMaxPlayers = 0;
        this.game = game;
    }

    // Methods
    public void incrementPlays(int numberOfPlayers) {
        this.playCount++;
        if (numberOfPlayers == game.getMaxPlayers()) {
            playsWithMaxPlayers++;
        }
    }
}
