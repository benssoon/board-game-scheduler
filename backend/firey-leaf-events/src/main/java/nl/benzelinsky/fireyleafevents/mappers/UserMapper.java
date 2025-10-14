package nl.benzelinsky.fireyleafevents.mappers;

import nl.benzelinsky.fireyleafevents.dtos.UserInputDto;
import nl.benzelinsky.fireyleafevents.dtos.UserOutputDto;
import nl.benzelinsky.fireyleafevents.models.User;

public class UserMapper {

    public static User toEntity(UserInputDto userInputDto) {
        User user = new User();

        user.setName(userInputDto.name);
        user.setEmailAddress(userInputDto.emailAddress);
        user.setTelephoneNumber(userInputDto.telephoneNumber);

        return user;
    }
    public static UserOutputDto toOutputDto(User user) {
        UserOutputDto userOutputDto = new UserOutputDto();

        userOutputDto.id = user.getId();
        userOutputDto.name = user.getName();
        userOutputDto.emailAddress = user.getEmailAddress();
        userOutputDto.telephoneNumber = user.getTelephoneNumber();

        return userOutputDto;
    }

}
