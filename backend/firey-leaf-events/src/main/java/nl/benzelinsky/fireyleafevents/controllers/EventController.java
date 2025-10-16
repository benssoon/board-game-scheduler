package nl.benzelinsky.fireyleafevents.controllers;

import jakarta.validation.Valid;
import nl.benzelinsky.fireyleafevents.dtos.EventInputDto;
import nl.benzelinsky.fireyleafevents.dtos.EventOutputDto;
import nl.benzelinsky.fireyleafevents.services.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

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
    public ResponseEntity<EventOutputDto> createEvent(@Valid @RequestBody EventInputDto eventInputDto) {
        EventOutputDto eventOutputDto = this.service.createEvent(eventInputDto);

        URI location = URI.create("/events/" + eventOutputDto.id);

        return ResponseEntity.created(location).body(eventOutputDto);
    }

    // Get Event by ID
    @GetMapping("/{id}")
    public ResponseEntity<EventOutputDto> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(this.service.getEventById(id));
    }

    // Update Event by ID
    @PutMapping("/{id}")
    public ResponseEntity<EventOutputDto> updateEventById(@PathVariable Long id,
                                                          @Valid @RequestBody EventInputDto dtoIn) {
        EventOutputDto dtoOut = this.service.updateEventById(id, dtoIn);
        return ResponseEntity.ok(dtoOut);
    }

    // Delete Event by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        return ResponseEntity.ok(this.service.deleteEventById(id));
    }

    /**********/

    // Couple Event with Game
    @PutMapping("/{eventId}/game/{gameId}")
    public void assignGameToEvent(@PathVariable("gameId") Long gameId, @PathVariable("eventId") Long eventId) {
        this.service.assignGameToEvent(gameId, eventId);
    }
}
