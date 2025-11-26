package nl.benzelinsky.fireyleafevents.repositories;

import nl.benzelinsky.fireyleafevents.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    Event getEventById(Long id);

    List<Event> findEventsByGame_Id(Long gameId);
}
