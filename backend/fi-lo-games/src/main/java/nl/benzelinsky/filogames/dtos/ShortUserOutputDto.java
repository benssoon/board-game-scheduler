package nl.benzelinsky.filogames.dtos;

import nl.benzelinsky.filogames.models.Role;

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
    public Set<Role> roles;
}
