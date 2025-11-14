package nl.benzelinsky.fireyleafevents.mappers;

import nl.benzelinsky.fireyleafevents.dtos.UserInputDto;
import nl.benzelinsky.fireyleafevents.dtos.UserOutputDto;
import nl.benzelinsky.fireyleafevents.models.Role;
import nl.benzelinsky.fireyleafevents.models.User;

public class UserMapper {

    public static User toEntity(UserInputDto inputDto) {
        User user = new User();

        user.setUsername(inputDto.username);
        user.setPassword(inputDto.password);
        user.setApiKey(inputDto.apiKey);
        user.setName(inputDto.name);
        user.setEmailAddress(inputDto.emailAddress);
        user.setTelephoneNumber(inputDto.telephoneNumber);
        for (Role role : inputDto.roles) {
            user.addRole(role);
        }

        return user;
    }
    public static UserOutputDto toShortDto(User user) {
        UserOutputDto outputDto = new UserOutputDto();

        outputDto.username = user.getUsername();
        outputDto.name = user.getName();
        outputDto.emailAddress = user.getEmailAddress();
        outputDto.telephoneNumber = user.getTelephoneNumber();
        outputDto.roles = user.getRoles();

        return outputDto;
    }
    public static UserOutputDto toFullDto(User user) {
        UserOutputDto outputDto = new UserOutputDto();

        outputDto.username = user.getUsername();
        outputDto.password = user.getPassword();
        outputDto.apiKey = user.getApiKey();
        outputDto.name = user.getName();
        outputDto.emailAddress = user.getEmailAddress();
        outputDto.telephoneNumber = user.getTelephoneNumber();
        outputDto.roles = user.getRoles();

        return outputDto;
    }

}
