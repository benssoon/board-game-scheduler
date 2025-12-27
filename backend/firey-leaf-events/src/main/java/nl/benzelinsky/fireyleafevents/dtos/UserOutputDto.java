package nl.benzelinsky.fireyleafevents.dtos;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.validation.constraints.NotNull;
import nl.benzelinsky.fireyleafevents.models.Event;
import nl.benzelinsky.fireyleafevents.models.Role;

import java.util.List;
import java.util.Set;

public class UserOutputDto {
    public String username;
    public String password; /* TODO Make test to check that this is never set except in CustomUserDetails.loadUserByUsername */
    public String apiKey;
    public String name;
    public String emailAddress;
    public String telephoneNumber;
    public int age;
    public String area;
    public String address;
    public List<TinyEventOutputDto> hostedEvents;
    public List<TinyEventOutputDto> joinedEvents;
    @JsonSerialize // TODO Is this necessary? What does it do exactly?
    public Set<Role> roles;
}