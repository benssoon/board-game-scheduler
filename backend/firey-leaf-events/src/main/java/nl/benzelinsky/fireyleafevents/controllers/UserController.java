package nl.benzelinsky.fireyleafevents.controllers;

import jakarta.validation.Valid;
import nl.benzelinsky.fireyleafevents.dtos.UserInputDto;
import nl.benzelinsky.fireyleafevents.dtos.UserOutputDto;
import nl.benzelinsky.fireyleafevents.exceptions.BadRequestException;
import nl.benzelinsky.fireyleafevents.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService service) {
        this.userService = service;
    }

    // Create User
    @PostMapping
    public ResponseEntity<UserOutputDto> createUser(@Valid @RequestBody UserInputDto dtoIn) {
        String newUsername = this.userService.createUser(dtoIn);
        this.userService.addRole(newUsername, "ROLE_USER");

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{username}").buildAndExpand(newUsername).toUri();

        return ResponseEntity.created(location).build();
    }

    // Get all Users
    @GetMapping(value = "")
    public ResponseEntity<List<UserOutputDto>> getUsers() {
        List<UserOutputDto> userDtos = this.userService.getUsers();
        return ResponseEntity.ok().body(userDtos);
    }

    // Get User by username
    @GetMapping("/{username}")
    public ResponseEntity<UserOutputDto> getUser(@PathVariable("username") String username, @AuthenticationPrincipal UserDetails userDetails) {
        if (username.equals(userDetails.getUsername())) {
            return ResponseEntity.ok(this.userService.getUser(username));
        }
        else {
            throw new BadRequestException("You are only authorized to view your own user profile.");
        }
    }

    // Update User by username
    @PutMapping("/{username}")
    public ResponseEntity<UserOutputDto> updateUser(@PathVariable("username") String username,
                                                    @Valid @RequestBody UserInputDto dtoIn) {
        this.userService.updateUser(username, dtoIn);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/{username}/roles")
    public ResponseEntity<Object> getUserRoles(@PathVariable("username") String username) {
        return ResponseEntity.ok().body(this.userService.getRoles(username));
    }

    @PostMapping(value = "/{username}/roles")
    public ResponseEntity<Object> addUserRole(@PathVariable("username") String username, @RequestParam String roleName) {
        try {
            this.userService.addRole(username, roleName);
            return ResponseEntity.noContent().build();
        }
        catch (Exception ex) {
            throw new BadRequestException("You are not authorized to add roles.");
        }
    }

    @DeleteMapping(value = "/{username}/roles/{role}")
    public ResponseEntity<Object> deleteUserRole(@PathVariable("username") String username, @PathVariable("role") String role) {
        this.userService.removeRole(username, role);
        return ResponseEntity.noContent().build();
    }

    // Delete User by username
    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable("username") String username) {
        return ResponseEntity.ok(this.userService.deleteUser(username));
    }
}
