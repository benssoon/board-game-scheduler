package nl.benzelinsky.fireyleafevents.services;

import nl.benzelinsky.fireyleafevents.dtos.UserOutputDto;
import nl.benzelinsky.fireyleafevents.models.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserService userService;

    public CustomUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserOutputDto userOutputDto = this.userService.getUserWithPassword(username);

        String password = userOutputDto.password;

        Set<Role> roles = userOutputDto.roles;
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        for (Role role : roles) {
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getRole()));
        }

        return new User(username, password, grantedAuthorities);
    }
}
