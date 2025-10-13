package nl.benzelinsky.fireyleafevents.services;

import nl.benzelinsky.fireyleafevents.dtos.UserInputDto;
import nl.benzelinsky.fireyleafevents.dtos.UserOutputDto;
import nl.benzelinsky.fireyleafevents.mappers.UserMapper;
import nl.benzelinsky.fireyleafevents.models.User;
import nl.benzelinsky.fireyleafevents.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    // Create user
    public UserOutputDto createUser(UserInputDto userInputDto) {
        User user = UserMapper.toEntity(userInputDto);
        this.repository.save(user);
        return UserMapper.toOutputDto(user);
    }

    // Get user by id
    public UserOutputDto getUserById(Long id) {
        User user = this.repository.getUserById(id);
        return UserMapper.toOutputDto(user);
        // EXCEPTION HANDLING!
    }

}
