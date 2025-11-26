package nl.benzelinsky.fireyleafevents.dtos;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class PatchUserInputDto {
    public String username;
    public String password;
    public String name;
    public String emailAddress;
    @Size(min = 10, max = 16)
    @Pattern(regexp = "^\\+?[0-9]{5,15}$")
    public String telephoneNumber;
}
