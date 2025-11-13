package nl.benzelinsky.fireyleafevents.repositories;

import nl.benzelinsky.fireyleafevents.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
