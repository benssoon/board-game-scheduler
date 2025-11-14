package nl.benzelinsky.fireyleafevents.dtos;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.validation.constraints.NotNull;
import nl.benzelinsky.fireyleafevents.models.Role;

import java.util.Set;

public class UserOutputDto {
    @NotNull
    public String username;
    public String password; /* TODO Make test to check that this is never set except in CustomUserDetails.loadUserByUsername */
    public String apiKey;
    public String name;
    public String emailAddress;
    public String telephoneNumber;
    @JsonSerialize
    public Set<Role> roles;
}
