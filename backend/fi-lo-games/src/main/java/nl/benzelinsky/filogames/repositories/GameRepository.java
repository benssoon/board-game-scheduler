package nl.benzelinsky.filogames.repositories;

import nl.benzelinsky.filogames.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findGamesByTitle(String title);

    boolean existsGamesByTitle(String title);
}
