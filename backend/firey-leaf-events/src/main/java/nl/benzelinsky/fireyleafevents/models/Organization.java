package nl.benzelinsky.fireyleafevents.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.util.List;

@Entity
public class Organization extends Host {

    private List<String> eventTypes;

    // Getters and Setters


    public List<String> getEventTypes() {
        return this.eventTypes;
    }

    public void setEventTypes(List<String> eventTypes) {
        this.eventTypes = eventTypes;
    }
}
