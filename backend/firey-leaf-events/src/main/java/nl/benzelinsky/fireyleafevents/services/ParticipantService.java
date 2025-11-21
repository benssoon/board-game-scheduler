package nl.benzelinsky.fireyleafevents.services;

import nl.benzelinsky.fireyleafevents.dtos.ParticipantInputDto;

public class ParticipantService {
    // Create participant
    public String createUser(ParticipantInputDto participantInputDto) {
        userInputDto.apiKey = RandomStringGenerator.generateAlphaNumeric(20);
        userInputDto.password = passwordEncoder.encode(userInputDto.password);
        User newUser = this.userRepository.save(UserMapper.toEntity(userInputDto));
        return newUser.getUsername();
    }
}
