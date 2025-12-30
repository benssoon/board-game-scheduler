package nl.benzelinsky.fireyleafevents.mappers;

import nl.benzelinsky.fireyleafevents.dtos.*;
import nl.benzelinsky.fireyleafevents.models.Role;
import nl.benzelinsky.fireyleafevents.models.User;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class UserMapper {

    public static User toEntity(UserInputDto inputDto) {
        User user = new User();

        user.setUsername(inputDto.username);
        user.setPassword(inputDto.password);
        user.setApiKey(inputDto.apiKey);
        user.setName(inputDto.name);
        user.setEmailAddress(inputDto.emailAddress);
        user.setTelephoneNumber(inputDto.telephoneNumber);
        user.setAge(inputDto.age);
        user.setArea(inputDto.area);
        user.setAddress(inputDto.address);

        return user;
    }
    public static TinyUserOutputDto toTinyDto(User user) {
        TinyUserOutputDto outputDto = new TinyUserOutputDto();

        outputDto.username = user.getUsername();
        outputDto.name = user.getName();
        outputDto.area = user.getArea();
        // Only send back the name of the event to prevent recursion. TODO add @JsonSerialize in the output DTO instead?
        List<TinyEventOutputDto> hostedEvents = new ArrayList<>();
        user.getHostedEvents().forEach((event) -> hostedEvents.add(EventMapper.toTinyDto(event)));
        outputDto.hostedEvents = hostedEvents;
        List<TinyEventOutputDto> joinedEvents = new ArrayList<>();
        user.getJoinedEvents().forEach((event) -> joinedEvents.add(EventMapper.toTinyDto(event)));
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
        List<TinyEventOutputDto> hostedEvents = new ArrayList<>();
        user.getHostedEvents().forEach((event) -> hostedEvents.add(EventMapper.toTinyDto(event)));
        outputDto.hostedEvents = hostedEvents;
        List<TinyEventOutputDto> joinedEvents = new ArrayList<>();
        user.getJoinedEvents().forEach((event) -> joinedEvents.add(EventMapper.toTinyDto(event)));
        outputDto.joinedEvents = joinedEvents;

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
        outputDto.roles = user.getRoles();

        return outputDto;
    }
}