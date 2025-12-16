package nl.benzelinsky.fireyleafevents.mappers;

import nl.benzelinsky.fireyleafevents.dtos.ShortUserOutputDto;
import nl.benzelinsky.fireyleafevents.dtos.TinyUserOutputDto;
import nl.benzelinsky.fireyleafevents.dtos.UserInputDto;
import nl.benzelinsky.fireyleafevents.dtos.UserOutputDto;
import nl.benzelinsky.fireyleafevents.models.Role;
import nl.benzelinsky.fireyleafevents.models.User;

import java.util.ArrayList;
import java.util.List;

public class UserMapper {

    public static User toEntity(UserInputDto inputDto) {
        User user = new User();

        user.setUsername(inputDto.username);
        user.setPassword(inputDto.password);
        user.setApiKey(inputDto.apiKey);
        user.setName(inputDto.name);
        user.setEmailAddress(inputDto.emailAddress);
        user.setTelephoneNumber(inputDto.telephoneNumber);

        return user;
    }
    public static TinyUserOutputDto toTinyDto(User user) {
        TinyUserOutputDto outputDto = new TinyUserOutputDto();

        outputDto.username = user.getUsername();
        outputDto.name = user.getName();
        outputDto.area = user.getArea();
        // Only send back the name of the event to prevent recursion. TODO add @JsonSerialize in the output DTO instead?
        List<String> hostedEvents = new ArrayList<>();
        user.getHostedEvents().forEach((event) -> hostedEvents.add(event.getName()));
        outputDto.hostedEvents = hostedEvents;
        List<String> joinedEvents = new ArrayList<>();
        user.getJoinedEvents().forEach((event) -> joinedEvents.add(event.getName()));
        outputDto.joinedEvents = joinedEvents;

        return outputDto;
    }
    public static ShortUserOutputDto toShortDto(User user) {
        ShortUserOutputDto outputDto = new ShortUserOutputDto();

        outputDto.username = user.getUsername();
        outputDto.name = user.getName();
        outputDto.emailAddress = user.getEmailAddress();
        outputDto.telephoneNumber = user.getTelephoneNumber();
        outputDto.age = user.getAge();
        outputDto.area = user.getArea();
        outputDto.address = user.getAddress();
        // Only send back the name of the event to prevent recursion. TODO add @JsonSerialize in the output DTO instead.
        List<String> hostedEvents = new ArrayList<>();
        user.getHostedEvents().forEach((event) -> hostedEvents.add(event.getName()));
        outputDto.hostedEvents = hostedEvents;
        List<String> joinedEvents = new ArrayList<>();
        user.getJoinedEvents().forEach((event) -> joinedEvents.add(event.getName()));
        outputDto.joinedEvents = joinedEvents;
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
        outputDto.age = user.getAge();
        outputDto.area = user.getArea();
        outputDto.address = user.getAddress();
        // TODO Add relations, with @JsonSerialize in DTO.
        outputDto.roles = user.getRoles();

        return outputDto;
    }
}