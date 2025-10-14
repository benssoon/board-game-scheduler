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
        URI location = URI.create("/users/" + userOutputDto.id);
        return ResponseEntity.created(location).body(userOutputDto);
    }

    // Get User by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserOutputDto> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(this.service.getUserById(id));
    }

    // Update User by ID
    @PutMapping("/{id}")
    public ResponseEntity<UserOutputDto> updateUserById(@PathVariable Long id,
                                                          @RequestBody UserInputDto dtoIn) {
        UserOutputDto dtoOut = this.service.updateUserById(id, dtoIn);
        return ResponseEntity.ok(dtoOut);
    }

    // Delete User by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        return ResponseEntity.ok(this.service.deleteUserById(id));
    }
}
