package nl.benzelinsky.fireyleafevents.controllers;

import jakarta.validation.Valid;
import nl.benzelinsky.fireyleafevents.dtos.UserInputDto;
import nl.benzelinsky.fireyleafevents.dtos.UserOutputDto;
import nl.benzelinsky.fireyleafevents.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // Create User
    @PostMapping
    public ResponseEntity<UserOutputDto> createUser(@Valid @RequestBody UserInputDto userInputDto) {
        UserOutputDto userOutputDto = this.service.createUser(userInputDto);
        URI location = URI.create("/users/" + userOutputDto.username);
        return ResponseEntity.created(location).body(userOutputDto);
    }

    // Get User by username
    @GetMapping("/{username}")
    public ResponseEntity<UserOutputDto> getUser(@PathVariable String username) {
        return ResponseEntity.ok(this.service.getUser(username));
    }

    // Update User by username
    @PutMapping("/{username}")
    public ResponseEntity<UserOutputDto> updateUser(@PathVariable String username,
                                                    @Valid @RequestBody UserInputDto dtoIn) {
        UserOutputDto dtoOut = this.service.updateUser(username, dtoIn);
        return ResponseEntity.ok(dtoOut);
    }

    // Delete User by username
    @DeleteMapping("/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        return ResponseEntity.ok(this.service.deleteUser(username));
    }
}
