package nl.benzelinsky.filogames.repositories;

import nl.benzelinsky.filogames.models.GameStats;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameStatsRepository extends JpaRepository<GameStats, Long> {
}
