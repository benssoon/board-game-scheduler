package nl.benzelinsky.fireyleafevents.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UserInputDto {

    @NotBlank
    public String name;
    @NotBlank
    public String emailAddress;
    @Size(min = 10, max = 16)
    @Pattern(regexp = "^\\+?[0-9]{5,15}$")
    public String telephoneNumber;
}