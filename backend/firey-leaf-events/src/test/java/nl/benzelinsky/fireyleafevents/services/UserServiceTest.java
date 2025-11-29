package nl.benzelinsky.fireyleafevents.services;

import nl.benzelinsky.fireyleafevents.dtos.ShortUserOutputDto;
import nl.benzelinsky.fireyleafevents.dtos.UserInputDto;
import nl.benzelinsky.fireyleafevents.exceptions.UserAlreadyExistsException;
import nl.benzelinsky.fireyleafevents.exceptions.UsernameUnavailableException;
import nl.benzelinsky.fireyleafevents.models.Event;
import nl.benzelinsky.fireyleafevents.models.Game;
import nl.benzelinsky.fireyleafevents.models.Role;
import nl.benzelinsky.fireyleafevents.models.User;
import nl.benzelinsky.fireyleafevents.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepository userRepository;
    @Mock
    PasswordEncoder passwordEncoder;

    @InjectMocks
    UserService userService;

    private String usernameUnavailableMessage;
    private String userExistsEmailMessage;
    private String userExistsPhoneMessage;
    private String usernameNotFoundMessage;
    private String roleTestNotFoundMessage;
    private String hasActiveEventsMessage;
    private String username;
    private String password;
    private String apiKey;
    private String name;
    private String email;
    private String phone;
    private int age;
    private String area;
    private String address;
    private List<Event> hostedEvents;
    private List<Game> gameCollection;
    private List<Game> favoriteGames;
    private List<Event> joinedEvents;
    private Set<Role> roles;
    private User user1;
    private User user2;
    private User user3;
    private UserInputDto dtoIn;
    private UserInputDto patchDto;

    @BeforeEach
    void setUp() {
        username = "ben";
        password = "1234";
        apiKey = "test-string";
        name = "Ben";
        email = "ben@made.up";
        phone = "123456789";
        roles = new HashSet<>();
        String[] rolesArray = {"USER", "ADMIN"};
        user1 = new User(username, password, name, email);
        user2 = new User("bob", "12345", "Bob", "bob@bob.bob");
        user3 = new User("saskia", "4321", "Saskia", "sas@sas.kia");
        dtoIn = new UserInputDto(username, password, apiKey, name, email, phone, age, area, address, rolesArray);
        usernameUnavailableMessage = "Username \"" + username + "\" is already taken.";
        userExistsEmailMessage = "A User already exists with email address \"" + email + "\".";
        userExistsPhoneMessage = "A User already exists with telephone number \"" + phone + "\".";
        usernameNotFoundMessage = "Cannot find user " + username;
        roleTestNotFoundMessage = "Role TEST does not exist.";
        hasActiveEventsMessage = "User with username " + username + " is currently hosting events:\n" +
                user1.getHostedEvents().toString() +
                "\nPlease remove those events before removing this user.";
    }

    @Test
    @DisplayName("Should create user")
    public void testCreateUser() {
        //arrange
        Mockito.when(passwordEncoder.encode(anyString())).thenReturn(password);
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(user1));

        //act
        ShortUserOutputDto newUser = userService.createUser(dtoIn);

        //assert
        assertEquals(dtoIn.username, newUser.username);
        assertEquals(dtoIn.name, newUser.name);
        assertEquals(dtoIn.emailAddress, newUser.emailAddress);
        assertEquals(dtoIn.telephoneNumber, newUser.telephoneNumber);
        assertEquals(dtoIn.age, newUser.age);
        assertEquals(dtoIn.area, newUser.area);
        assertEquals(dtoIn.address, newUser.address);
    }

    @Test
    @DisplayName("Should throw UserAlreadyExistsException with telephone number")
    public void testCreateUserThrowsUserAlreadyExistsExceptionPhone() {
        Mockito.when(userRepository.existsUserByTelephoneNumber(dtoIn.telephoneNumber)).thenReturn(true);

        UserAlreadyExistsException exception = assertThrowsExactly(UserAlreadyExistsException.class, () -> userService.createUser(dtoIn));

        assertEquals(userExistsPhoneMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw UserAlreadyExistsException with email")
    public void testCreateUserThrowsUserAlreadyExistsExceptionEmail() {
        Mockito.when(userRepository.existsUserByEmailAddress(dtoIn.emailAddress)).thenReturn(true);

        UserAlreadyExistsException exception = assertThrowsExactly(UserAlreadyExistsException.class, () -> userService.createUser(dtoIn));

        assertEquals(userExistsEmailMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw UsernameUnavailableException")
    public void testCreateUserThrowsUsernameUnavailableException() {
        Mockito.when(userRepository.existsUserByUsername(dtoIn.username)).thenReturn(true);

        UsernameUnavailableException exception = assertThrowsExactly(UsernameUnavailableException.class, () -> userService.createUser(dtoIn));

        assertEquals(usernameUnavailableMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should return all users")
    public void getAllUsers() {
        //arrange
        List<User> allUsers = Arrays.asList(user1, user2, user3);
        /*allUsers.forEach(u -> {

        });*/

        Mockito.when(userRepository.findAll()).thenReturn(allUsers);

        //act
        List<ShortUserOutputDto> dtoUsers = userService.getAllUsers();

        //assert
        allUsers.forEach(u -> {
            ShortUserOutputDto dto = dtoUsers.get(allUsers.indexOf(u));
            assertEquals(u.getUsername(), dto.username);
            assertEquals(u.getName(), dto.name);
            assertEquals(u.getEmailAddress(), dto.emailAddress);
            assertEquals(u.getTelephoneNumber(), dto.telephoneNumber);
            assertEquals(u.getAge(), dto.age);
            assertEquals(u.getArea(), dto.area);
            assertEquals(u.getAddress(), dto.address);
            u.getHostedEvents().forEach(e -> {
                assertTrue(dto.hostedEvents.contains(e.getName()));
            });
            u.getJoinedEvents().forEach(e -> {
                assertTrue(dto.joinedEvents.contains(e.getName()));
            });
            u.getRoles().forEach(r -> {
                assertTrue(dto.roles.contains(r));
            });
        });
    }

    @Test
    void getUser() {
    }

    @Test
    void getUserWithPassword() {
    }

    @Test
    void updateWholeUser() {
    }

    @Test
    void updateUser() {
    }

    @Test
    void getRoles() {
    }

    @Test
    void addRole() {
    }

    @Test
    void removeRole() {
    }

    @Test
    void deleteUser() {
    }
}