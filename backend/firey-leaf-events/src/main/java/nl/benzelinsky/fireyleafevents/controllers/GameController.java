package nl.benzelinsky.fireyleafevents.controllers;

import jakarta.validation.Valid;
import nl.benzelinsky.fireyleafevents.dtos.GameInputDto;
import nl.benzelinsky.fireyleafevents.dtos.GameOutputDto;
import nl.benzelinsky.fireyleafevents.services.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/games")
public class GameController {

    private final GameService service;

    public GameController(GameService service) {
        this.service = service;
    }

    // Create Game
    @PostMapping
    public ResponseEntity<GameOutputDto> createGame(@Valid @RequestBody GameInputDto dtoIn) {
        GameOutputDto dtoOut = this.service.createGame(dtoIn);

        URI location = URI.create("/games/" + dtoOut.id);

        return ResponseEntity.created(location).body(dtoOut);
    }

    // Get Game by ID
    @GetMapping("/{id}")
    public ResponseEntity<GameOutputDto> getGameById(@PathVariable Long id) {
        return ResponseEntity.ok(this.service.getGameById(id));
    }

    // Get all Games
    @GetMapping
    public ResponseEntity<List<GameOutputDto>> getAllGames() {
        return ResponseEntity.ok(this.service.getAllGames());
    }

    // Update Game by ID
    @PutMapping("/{id}")
    public ResponseEntity<GameOutputDto> updateGameById(@PathVariable Long id,
                                                          @Valid @RequestBody GameInputDto dtoIn) {
        GameOutputDto dtoOut = this.service.updateGameById(id, dtoIn);
        return ResponseEntity.ok(dtoOut);
    }

    // Delete Game by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGame(@PathVariable Long id) {
        return ResponseEntity.ok(this.service.deleteGameById(id));
    }
}
