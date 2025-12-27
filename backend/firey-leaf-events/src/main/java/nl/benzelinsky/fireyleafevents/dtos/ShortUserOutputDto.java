package nl.benzelinsky.fireyleafevents.dtos;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import nl.benzelinsky.fireyleafevents.models.Role;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ShortUserOutputDto {
    public String username;
    public String name;
    public String emailAddress;
    public String telephoneNumber;
    public int age;
    public String area;
    public String address;
    public List<TinyEventOutputDto> hostedEvents;
    public List<TinyEventOutputDto> joinedEvents;
    @JsonSerialize
    public Set<Role> roles;
}
