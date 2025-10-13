package nl.benzelinsky.fireyleafevents.services;

import nl.benzelinsky.fireyleafevents.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }


}
