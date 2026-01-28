package nl.benzelinsky.fireyleafevents.repositories;

import nl.benzelinsky.fireyleafevents.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findGamesByTitle(String title);

    boolean existsGamesByTitle(String title);
}
