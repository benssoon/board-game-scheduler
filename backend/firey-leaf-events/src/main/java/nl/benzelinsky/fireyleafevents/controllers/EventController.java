package nl.benzelinsky.fireyleafevents.controllers;

import jakarta.validation.Valid;
import nl.benzelinsky.fireyleafevents.dtos.EventInputDto;
import nl.benzelinsky.fireyleafevents.dtos.EventOutputDto;
import nl.benzelinsky.fireyleafevents.dtos.PatchEventInputDto;
import nl.benzelinsky.fireyleafevents.services.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/events")
public class EventController {

    private final EventService service;

    public EventController(EventService service) {
        this.service = service;
    }

    // Create Event
    @PostMapping
    public ResponseEntity<EventOutputDto> createEvent(
            @Valid @RequestBody EventInputDto eventInputDto,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        EventOutputDto eventOutputDto = this.service.createEvent(eventInputDto, username);

        URI location = URI.create(
                ServletUriComponentsBuilder
                        .fromCurrentRequest()
                        .path("/" + eventOutputDto.id).toUriString());

        return ResponseEntity.created(location).body(eventOutputDto);
    }

    // Get all Events
    @GetMapping
    public ResponseEntity<List<EventOutputDto>> getAllEvents(@RequestParam(required = false) Long gameId) {
        return ResponseEntity.ok(this.service.getAllEvents(gameId));
    }

    // Get Event by ID
    @GetMapping("/{id}")
    public ResponseEntity<EventOutputDto> getEventById(
            @PathVariable Long id) {
        return ResponseEntity.ok(this.service.getEventById(id));
    }

    // Update Event by ID
    @PatchMapping("/{id}")
    public ResponseEntity<EventOutputDto> updateEventById(
            @PathVariable Long id,
            @Valid @RequestBody PatchEventInputDto dtoIn) {
        EventOutputDto dtoOut = this.service.updateEventById(id, dtoIn);
        return ResponseEntity.ok(dtoOut);
    }

    // Delete Event by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(
            @PathVariable Long id) {
        return ResponseEntity.ok(this.service.deleteEventById(id));
    }

    // Delete all Events (besides default event)
    @DeleteMapping("/deleteAll")
    public ResponseEntity<String> deleteAll() {
        return ResponseEntity.ok(this.service.deleteAllEvents());
    }

    /**********/

    // Couple Event with Game
    @PutMapping("/{eventId}/game/{gameId}")
    public ResponseEntity<EventOutputDto> assignGameToEvent(
            @PathVariable("gameId") Long gameId,
            @PathVariable("eventId") Long eventId) {
        return ResponseEntity.ok(this.service.assignGameToEvent(gameId, eventId));
    }

    // Add player to Event
    @PatchMapping("/{eventId}/add-player/{username}")
    public ResponseEntity<EventOutputDto> addPlayer(
            @PathVariable("username") String username,
            @PathVariable("eventId") Long eventId) {
        return ResponseEntity.ok(this.service.addPlayer(username, eventId));
    }

    // Add current User as a player in Event
    @PatchMapping("/{eventId}/join")
    public ResponseEntity<EventOutputDto> addCurrentUser(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("eventId") Long eventId) {
        String username = userDetails.getUsername();
        return ResponseEntity.ok(this.service.addPlayer(username, eventId));
    }

    @PatchMapping("/{eventId}/remove-player/{username}")
    public ResponseEntity<EventOutputDto> removePlayer(
            @PathVariable("username") String username,
            @PathVariable("eventId") Long eventId) {
        return ResponseEntity.ok(this.service.removePlayer(username, eventId));
    }

    @PatchMapping("/{eventId}/leave")
    public ResponseEntity<EventOutputDto> removeCurrentUser (
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("eventId") Long eventId) {
        String username = userDetails.getUsername();
        return ResponseEntity.ok(this.service.removePlayer(username, eventId));
    }
}
