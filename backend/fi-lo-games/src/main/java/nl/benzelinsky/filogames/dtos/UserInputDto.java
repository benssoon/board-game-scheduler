package nl.benzelinsky.filogames.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.NoArgsConstructor;

@RequiredArgsConstructor
@AllArgsConstructor
@NoArgsConstructor
public class UserInputDto {
    @NotBlank
    @NonNull
    public String username;
    @NotBlank
    @NonNull
    public String password;
    @NotBlank
    @NonNull
    public String name;
    @NotBlank
    @NonNull
    public String emailAddress;
    @Size(min = 10, max = 16)
    @Pattern(regexp = "^\\+?[0-9]{5,15}$")
    public String telephoneNumber;
    public int age;
    public String area;
    public String address;
    public String[] roles;
}
