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
    
    // Update user by ID
    public UserOutputDto updateUserById(Long id, UserInputDto dtoIn) {
        User toUpdate = this.repository.findById(id)
                .orElseThrow(() ->
                        new RecordNotFoundException("User not found."));

        toUpdate.setName(dtoIn.name);
        toUpdate.setEmailAddress(dtoIn.emailAddress);
        toUpdate.setTelephoneNumber(dtoIn.telephoneNumber);

        this.repository.save(toUpdate);
        return UserMapper.toOutputDto(toUpdate);
    }

    // Delete user by ID
    public String deleteUserById(Long id) {
        User toDelete = this.repository.findById(id)
                .orElseThrow(() ->
                        new RecordNotFoundException("User not found."));
        this.repository.delete(toDelete);
        return "User " + toDelete.getName() + " has been deleted.";
    }

}
