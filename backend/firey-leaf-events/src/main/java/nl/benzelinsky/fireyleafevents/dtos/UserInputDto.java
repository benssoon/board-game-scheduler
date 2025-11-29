package nl.benzelinsky.fireyleafevents.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import nl.benzelinsky.fireyleafevents.models.Role;

import java.util.Set;

@AllArgsConstructor
public class UserInputDto {
    @NotBlank
    public String username;
    @NotBlank
    public String password;
    public String apiKey;
    @NotBlank
    public String name;
    @NotBlank
    public String emailAddress;
    @Size(min = 10, max = 16)
    @Pattern(regexp = "^\\+?[0-9]{5,15}$")
    public String telephoneNumber;
    public int age;
    public String area;
    public String address;
    public String[] roles;
}