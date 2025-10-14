package nl.benzelinsky.fireyleafevents.services;

import nl.benzelinsky.fireyleafevents.dtos.UserInputDto;
import nl.benzelinsky.fireyleafevents.dtos.UserOutputDto;
import nl.benzelinsky.fireyleafevents.exceptions.RecordNotFoundException;
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
        return UserMapper.toOutputDto(
                this.repository.findById(id)
                        .orElseThrow(() ->
                                new RecordNotFoundException("User not found")));


    }

}
