package nl.benzelinsky.fireyleafevents.dtos;

import jakarta.validation.constraints.NotBlank;

public class UserInputDto {

    @NotBlank
    public String name;
    @NotBlank
    public String emailAddress;
    public int telephoneNumber;
}
