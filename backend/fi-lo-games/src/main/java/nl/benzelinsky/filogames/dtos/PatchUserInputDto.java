package nl.benzelinsky.filogames.dtos;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class PatchUserInputDto {
    public String password;
    public String name;
    public String emailAddress;
    @Size(max = 16)
    @Pattern(regexp = "^\\+?[0-9]{5,15}$")
    public String telephoneNumber;
    public String area;
    public String address;
}
