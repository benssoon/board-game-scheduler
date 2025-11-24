package nl.benzelinsky.fireyleafevents.services;

import nl.benzelinsky.fireyleafevents.dtos.UserInputDto;
import nl.benzelinsky.fireyleafevents.dtos.UserOutputDto;
import nl.benzelinsky.fireyleafevents.exceptions.RecordNotFoundException;
import nl.benzelinsky.fireyleafevents.exceptions.RoleNotFoundException;
import nl.benzelinsky.fireyleafevents.exceptions.UsernameNotFoundException;
import nl.benzelinsky.fireyleafevents.mappers.UserMapper;
import nl.benzelinsky.fireyleafevents.models.Event;
import nl.benzelinsky.fireyleafevents.models.Role;
import nl.benzelinsky.fireyleafevents.models.User;
import nl.benzelinsky.fireyleafevents.repositories.EventRepository;
import nl.benzelinsky.fireyleafevents.repositories.UserRepository;
import nl.benzelinsky.fireyleafevents.utils.RandomStringGenerator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

@Service
public class UserService {

    private  final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder, EventRepository eventRepository) {
        this.userRepository = repository;
        this.passwordEncoder = passwordEncoder;
        this.eventRepository = eventRepository;
    }

    // Create user
    public String createUser(UserInputDto userInputDto) {
        userInputDto.apiKey = RandomStringGenerator.generateAlphaNumeric(20);
        userInputDto.password = passwordEncoder.encode(userInputDto.password);
        User newUser = this.userRepository.save(UserMapper.toEntity(userInputDto));
        return newUser.getUsername();
    }

    // Get all users
    public List<UserOutputDto> getUsers() {
        List<UserOutputDto> allUsers = new ArrayList<>();
        this.userRepository.findAll()
                .forEach(user ->
                        allUsers.add(UserMapper.toShortDto(user)));
        return allUsers;
    }

    // Get user by username
    public UserOutputDto getUser(String username) {
        return UserMapper.toShortDto(
                this.userRepository.findById(username)
                        .orElseThrow(() ->
                                new UsernameNotFoundException("User not found with username: " + username)));
    }

    public UserOutputDto getUserWithPassword(String username) {
        return UserMapper.toFullDto(
                this.userRepository.findById(username)
                        .orElseThrow(() ->
                                new UsernameNotFoundException("User not found with username: " + username)));
    }
    
    // Update user by username
    public UserOutputDto updateUser(String username, UserInputDto dtoIn) {
        User toUpdate = this.userRepository.findById(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(username));

        // Doing this with a mapper wouldn't work, because then the record would get a different id.
        toUpdate.setPassword(dtoIn.password);
        toUpdate.setName(dtoIn.name);
        toUpdate.setEmailAddress(dtoIn.emailAddress);
        toUpdate.setTelephoneNumber(dtoIn.telephoneNumber);

        this.userRepository.save(toUpdate);
        return UserMapper.toShortDto(toUpdate);
    }

    // Get User roles
    public Set<Role> getRoles(String username) {
        User user = this.userRepository.findById(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(username));
        UserOutputDto dtoOut = UserMapper.toShortDto(user);
        return dtoOut.roles;
    }

    public void addRole(String username, String roleName) {
        roleName = "ROLE_" + roleName.toUpperCase();
        User user = this.userRepository.findById(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(username));
        user.addRole(new Role(username, roleName));
        this.userRepository.save(user);
    }

    public void removeRole(String username, String role) {
        User user = this.userRepository.findById(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(username));
        Role roleToRemove = user.getRoles().stream().filter((a) -> a.getRole().equalsIgnoreCase(role)).findAny()
                        .orElseThrow(() ->
                                new RoleNotFoundException(role));
        user.removeRole(roleToRemove);
        this.userRepository.save(user);
    }

    // Delete user by username
    public String deleteUser(String username) {
        User toDelete = this.userRepository.findById(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(username));
        this.userRepository.deleteById(username);
        return "User " + toDelete.getUsername() + " has been deleted.";
    }
}