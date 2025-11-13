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

    // Get user by username
    public UserOutputDto getUser(String username) {
        return UserMapper.toOutputDto(
                this.repository.findById(username)
                        .orElseThrow(() ->
                                new RecordNotFoundException("User not found")));
    }
    
    // Update user by username
    public UserOutputDto updateUser(String username, UserInputDto dtoIn) {
        User toUpdate = this.repository.findById(username)
                .orElseThrow(() ->
                        new RecordNotFoundException("User not found."));

        // Doing this with a mapper wouldn't work, because then the record would get a different id.
        toUpdate.setName(dtoIn.name);
        toUpdate.setEmailAddress(dtoIn.emailAddress);
        toUpdate.setTelephoneNumber(dtoIn.telephoneNumber);

        this.repository.save(toUpdate);
        return UserMapper.toOutputDto(toUpdate);
    }

    // Delete user by username
    public String deleteUser(String username) {
        User toDelete = this.repository.findById(username)
                .orElseThrow(() ->
                        new RecordNotFoundException("User not found."));
        this.repository.delete(toDelete);
        return "User " + toDelete.getName() + " has been deleted.";
    }

}
