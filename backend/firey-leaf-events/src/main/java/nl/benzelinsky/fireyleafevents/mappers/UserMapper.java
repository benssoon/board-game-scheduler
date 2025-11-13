package nl.benzelinsky.fireyleafevents.mappers;

import nl.benzelinsky.fireyleafevents.dtos.UserInputDto;
import nl.benzelinsky.fireyleafevents.dtos.UserOutputDto;
import nl.benzelinsky.fireyleafevents.models.User;

public class UserMapper {

    public static User toEntity(UserInputDto inputDto) {
        User user = new User();

        user.setName(inputDto.name);
        user.setEmailAddress(inputDto.emailAddress);
        user.setTelephoneNumber(inputDto.telephoneNumber);

        return user;
    }
    public static UserOutputDto toOutputDto(User user) {
        UserOutputDto outputDto = new UserOutputDto();

        outputDto.username = user.getUsername();
        outputDto.name = user.getName();
        outputDto.emailAddress = user.getEmailAddress();
        outputDto.telephoneNumber = user.getTelephoneNumber();

        return outputDto;
    }

}
