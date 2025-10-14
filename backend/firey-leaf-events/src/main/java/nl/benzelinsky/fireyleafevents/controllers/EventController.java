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

    @PostMapping
    public ResponseEntity<EventOutputDto> createEvent(@Valid @RequestBody EventInputDto eventInputDto) {
        EventOutputDto eventOutputDto = this.service.createEvent(eventInputDto);

        URI location = URI.create("/events/" + eventOutputDto.id);

        return ResponseEntity.created(location).body(eventOutputDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventOutputDto> getEvent(@PathVariable Long id) {
        return ResponseEntity.ok(this.service.getEventById(id));
    }

}
