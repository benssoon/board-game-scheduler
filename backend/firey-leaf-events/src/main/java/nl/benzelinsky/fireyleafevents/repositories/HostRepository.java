package nl.benzelinsky.fireyleafevents.repositories;

import nl.benzelinsky.fireyleafevents.models.Host;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HostRepository extends JpaRepository<Host, Long> {
}
