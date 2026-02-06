package nl.benzelinsky.filogames.dtos;

import nl.benzelinsky.filogames.models.Role;

import java.util.List;
import java.util.Set;

public class UserOutputDto {
    public String username;
    public String password; /* TODO Make test to check that this is never set except in CustomUserDetails.loadUserByUsername */
    public String name;
    public String emailAddress;
    public String telephoneNumber;
    public int age;
    public String area;
    public String address;
    public List<TinyEventOutputDto> hostedEvents;
    public List<TinyEventOutputDto> joinedEvents;
    public Set<Role> roles;
}