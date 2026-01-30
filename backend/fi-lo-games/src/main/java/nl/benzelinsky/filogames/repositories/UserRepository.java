package nl.benzelinsky.filogames.repositories;

import nl.benzelinsky.filogames.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsUserByUsername(String username);

    boolean existsUserByEmailAddress(String emailAddress);

    boolean existsUserByTelephoneNumber(String telephoneNumber);
}
