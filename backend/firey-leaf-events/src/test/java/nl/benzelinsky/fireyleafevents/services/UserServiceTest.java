package nl.benzelinsky.fireyleafevents.services;

import nl.benzelinsky.fireyleafevents.dtos.*;
import nl.benzelinsky.fireyleafevents.exceptions.*;
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
    private String alreadyHasRoleMessage;
    private String roleNotFoundMessage;
    private String userDeletedMessage;
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
    private String[] rolesArray = {"USER", "ADMIN"};
    private User user1;
    private User user2;
    private User user3;
    private UserInputDto dtoIn;
    private UserInputDto shortUpdateDto;
    private PatchUserInputDto patchDtoFull;
    private PatchUserInputDto patchDtoEmpty;

    @BeforeEach
    void setUp() {
        username = "ben";
        password = "1234";
        apiKey = "test-string";
        name = "Ben";
        email = "ben@made.up";
        phone = "123456789";
        roles = new HashSet<>();
        user1 = new User(username, password, name, email);
        user2 = new User("bob", "12345", "Bob", "bob@bob.bob");
        user3 = new User("saskia", "4321", "Saskia", "sas@sas.kia");
        dtoIn = new UserInputDto(username, password, apiKey, name, email, phone, age, area, address, rolesArray);
        shortUpdateDto = new UserInputDto(username, "abcd", "Moishe", "moishe@oy.vey");
        patchDtoFull = new PatchUserInputDto("abcd", "Moishe", "moishe@oy.vey", "123456789", "Stetl", "some address");
        patchDtoEmpty = new PatchUserInputDto();
        usernameUnavailableMessage = "Username \"" + username + "\" is already taken.";
        userExistsEmailMessage = "A User already exists with email address \"" + email + "\".";
        userExistsPhoneMessage = "A User already exists with telephone number \"" + phone + "\".";
        usernameNotFoundMessage = "Cannot find user " + username;
        alreadyHasRoleMessage = "User with username " + username + " already has role ROLE_" + rolesArray[0];
        roleNotFoundMessage = "Role " + rolesArray[0] + " does not exist.";
        userDeletedMessage = "User " + username + " has been deleted.";
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
        List<TinyUserOutputDto> dtoUsers = userService.getAllUsers();

        //assert
        allUsers.forEach(u -> {
            TinyUserOutputDto dto = dtoUsers.get(allUsers.indexOf(u));
            assertEquals(u.getUsername(), dto.username);
            assertEquals(u.getName(), dto.name);
            assertEquals(u.getArea(), dto.area);
            u.getHostedEvents().forEach(e -> {
                assertTrue(dto.hostedEvents.contains(e.getName()));
            });
            u.getJoinedEvents().forEach(e -> {
                assertTrue(dto.joinedEvents.contains(e.getName()));
            });
        });
    }

    @Test
    @DisplayName("Should return the correct user (self)")
    void testGetUserSelf() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(user1));

        //act
        ShortUserOutputDto dto = (ShortUserOutputDto) userService.getUser(username, true);

        //assert
        assertEquals(user1.getUsername(), dto.username);
        assertEquals(user1.getName(), dto.name);
        assertEquals(user1.getEmailAddress(), dto.emailAddress);
        assertEquals(user1.getTelephoneNumber(), dto.telephoneNumber);
        assertEquals(user1.getAge(), dto.age);
        assertEquals(user1.getArea(), dto.area);
        assertEquals(user1.getAddress(), dto.address);
        user1.getHostedEvents().forEach(e -> {
            assertTrue(dto.hostedEvents.contains(e.getName()));
        });
        user1.getJoinedEvents().forEach(e -> {
            assertTrue(dto.joinedEvents.contains(e.getName()));
        });
    }

    //TODO test for non-self user as well.

    @Test
    @DisplayName("Should throw UsernameNotFoundException")
    public void testGetUserThrowsUsernameNotFoundException() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.empty());

        //act
        UsernameNotFoundException exception = assertThrowsExactly(UsernameNotFoundException.class, () -> userService.getUser(username, true));

        //assert
        assertEquals(usernameNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should return full dto of correct user")
    void getUserWithPassword() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(user1));

        //act
        UserOutputDto dto = userService.getUserWithPassword(username);

        //assert
        assertEquals(user1.getUsername(), dto.username);
        assertEquals(user1.getPassword(), dto.password);
        assertEquals(user1.getApiKey(), dto.apiKey);
        assertEquals(user1.getName(), dto.name);
        assertEquals(user1.getEmailAddress(), dto.emailAddress);
        assertEquals(user1.getTelephoneNumber(), dto.telephoneNumber);
        assertEquals(user1.getAge(), dto.age);
        assertEquals(user1.getArea(), dto.area);
        assertEquals(user1.getAddress(), dto.address);
        user1.getHostedEvents().forEach(e -> {
            assertTrue(dto.hostedEvents.contains(e.getName()));
        });
        user1.getJoinedEvents().forEach(e -> {
            assertTrue(dto.joinedEvents.contains(e.getName()));
        });
        user1.getRoles().forEach(r -> {
            assertTrue(dto.roles.contains(r));
        });
    }

    @Test
    @DisplayName("Should throw UsernameNotFoundException")
    public void testGetUserWithPasswordThrowsUsernameNotFoundException() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.empty());

        //act
        UsernameNotFoundException exception = assertThrowsExactly(UsernameNotFoundException.class, () -> userService.getUserWithPassword(username));

        //assert
        assertEquals(usernameNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should return user with updated values")
    void updateWholeUser() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(user1));
        Mockito.when(passwordEncoder.encode(anyString())).thenReturn("$2a$12$O2eOMLCxxkhZMmKCZk6G8OEq6fh2Q0Ti4P04dZUECsTY3k6rE0.y6");

        //act
        ShortUserOutputDto dto = userService.updateWholeUser(username, shortUpdateDto);

        //assert
        assertEquals("$2a$12$O2eOMLCxxkhZMmKCZk6G8OEq6fh2Q0Ti4P04dZUECsTY3k6rE0.y6", user1.getPassword());
        assertEquals(shortUpdateDto.name, user1.getName());
        assertEquals(shortUpdateDto.emailAddress, user1.getEmailAddress());
        assertEquals(shortUpdateDto.telephoneNumber, user1.getTelephoneNumber());
        assertEquals(user1.getName(), dto.name);
        assertEquals(user1.getEmailAddress(), dto.emailAddress);
        assertEquals(user1.getTelephoneNumber(), dto.telephoneNumber);
    }

    @Test
    @DisplayName("Should throw UsernameNotFoundException")
    public void testUpdateWholeUserThrowsUsernameNotFoundException() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.empty());

        //act
        UsernameNotFoundException exception = assertThrowsExactly(UsernameNotFoundException.class, () -> userService.updateWholeUser(username, shortUpdateDto));

        //assert
        assertEquals(usernameNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should return fully updated user")
    void testUpdateUserAllAttributes() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(user1));

        //act
        ShortUserOutputDto dto = userService.updateUser(username, patchDtoFull);

        //assert
        assertEquals(patchDtoFull.password, user1.getPassword());
        assertEquals(patchDtoFull.name, user1.getName());
        assertEquals(patchDtoFull.emailAddress, user1.getEmailAddress());
        assertEquals(patchDtoFull.telephoneNumber, user1.getTelephoneNumber());
        assertEquals(user1.getName(), dto.name);
        assertEquals(user1.getEmailAddress(), dto.emailAddress);
        assertEquals(user1.getTelephoneNumber(), dto.telephoneNumber);
    }

    @Test
    @DisplayName("Should return unupdated user")
    void testUpdateUserNoAttributes() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(user1));

        //act
        ShortUserOutputDto dto = userService.updateUser(username, patchDtoEmpty);

        //assert
        assertEquals(password, user1.getPassword());
        assertEquals(name, user1.getName());
        assertEquals(email, user1.getEmailAddress());
        assertEquals(null, user1.getTelephoneNumber());
        assertEquals(user1.getName(), dto.name);
        assertEquals(user1.getEmailAddress(), dto.emailAddress);
        assertEquals(user1.getTelephoneNumber(), dto.telephoneNumber);
    }

    @Test
    @DisplayName("Should throw UsernameNotFoundException")
    public void testUpdateUserThrowsUsernameNotFoundException() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.empty());

        //act
        UsernameNotFoundException exception = assertThrowsExactly(UsernameNotFoundException.class, () -> userService.updateUser(username, patchDtoFull));

        //assert
        assertEquals(usernameNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should return all roles of specified user")
    public void testGetRoles() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(user1));
        user1.addRole(new Role(username, rolesArray[0]));
        user1.addRole(new Role(username, rolesArray[1]));

        //act
        Set<Role> fetchedRoles = userService.getRoles(username);

        //assert
        fetchedRoles.forEach(role -> {
            assertTrue(user1.getRoles().contains(role));
        });
        user1.getRoles().forEach(role -> {
            assertTrue(fetchedRoles.contains(role));
        });
    }

    @Test
    @DisplayName("Should return UsernameNotFoundException")
    public void testGetRolesThrowsUsernameNotFoundException() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.empty());

        //act
        UsernameNotFoundException exception = assertThrowsExactly(UsernameNotFoundException.class, () -> userService.getRoles(username));

        //assert
        assertEquals(usernameNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should add role to user")
    void addRole() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(user1));

        //act
        userService.addRole(username, rolesArray[0]);

        //assert
        user1.getRoles().forEach(role -> assertEquals("ROLE_" + rolesArray[0], role.getRole()));
    }

    @Test
    @DisplayName("Should throw UsernameNotFoundException")
    public void testAddRoleThrowsUsernameNotFoundException() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.empty());

        //act
        UsernameNotFoundException exception = assertThrowsExactly(UsernameNotFoundException.class, () -> userService.addRole(username, rolesArray[0]));

        //assert
        assertEquals(usernameNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw AlreadyHasRoleException")
    public void testAddRoleThrowsAlreadyHasRoleException() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(user1));
        user1.addRole(new Role(username, "ROLE_" + rolesArray[0]));

        //act
        AlreadyHasRoleException exception = assertThrowsExactly(AlreadyHasRoleException.class, () -> userService.addRole(username, rolesArray[0]));

        //assert
        assertEquals(alreadyHasRoleMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should remove role from user")
    void testRemoveRole() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(user1));
        user1.addRole(new Role(username, "ROLE_" + rolesArray[0]) );

        //act
        userService.removeRole(username, rolesArray[0]);

        //assert
        user1.getRoles().forEach(role -> assertNotEquals("ROLE_" + rolesArray[0], role.getRole()));
    }

    @Test
    @DisplayName("Should throw UsernameNotFoundException")
    public void testRemoveRoleThrowsUsernameNotFoundException() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.empty());

        //act
        UsernameNotFoundException exception = assertThrowsExactly(UsernameNotFoundException.class, () -> userService.removeRole(username, rolesArray[0]));

        //assert
        assertEquals(usernameNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw RoleNotFoundException")
    public void testRemoveRoleThrowsRoleNotFoundException() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(user1));

        //act
        RoleNotFoundException exception = assertThrowsExactly(RoleNotFoundException.class, () -> userService.removeRole(username, rolesArray[0]));

        //assert
        assertEquals(roleNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should delete user")
    void testDeleteUser() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(user1));

        //act
        String message = userService.deleteUser(username);

        //assert
        assertEquals(userDeletedMessage, message);
    }

    @Test
    @DisplayName("Should throw UsernameNotFoundException")
    public void testDeleteUserThrowsUsernameNotFoundException() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.empty());

        //act
        UsernameNotFoundException exception = assertThrowsExactly(UsernameNotFoundException.class, () -> userService.deleteUser(username));

        //assert
        assertEquals(usernameNotFoundMessage, exception.getMessage());
    }

    @Test
    @DisplayName("Should throw HasActiveEventsException")
    public void testDeleteUserThrowsHasActiveEventsException() {
        //arrange
        Mockito.when(userRepository.findById(anyString())).thenReturn(Optional.of(user1));
        Event newEvent = new Event("Root Night");
        newEvent.setId(1L);
        user1.hostEvent(newEvent);
        Event newEvent2 = new Event("Arcs Night");
        newEvent2.setId(2L);
        user1.hostEvent(newEvent2);

        List<String> events = new ArrayList<>();
            Map<Long, String> eventIds = new HashMap<>();
            user1.getHostedEvents()
                    .forEach(event -> {
                        events.add(event.getName());
                        eventIds.put(event.getId(), event.getName());
                    });
        hasActiveEventsMessage = "User with username " + username + " is currently hosting events:\n" +
                eventIds.toString() +
                "\nPlease remove those events before removing this user.";

        //act
        HasActiveEventsException exception = assertThrowsExactly(HasActiveEventsException.class, () -> userService.deleteUser(username));

        //assert
        assertEquals(hasActiveEventsMessage, exception.getMessage());
    }
}