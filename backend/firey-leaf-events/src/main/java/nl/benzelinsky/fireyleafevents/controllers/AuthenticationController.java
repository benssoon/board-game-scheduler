package nl.benzelinsky.fireyleafevents.controllers;

import nl.benzelinsky.fireyleafevents.dtos.AuthenticationRequest;
import nl.benzelinsky.fireyleafevents.dtos.AuthenticationResponse;
import nl.benzelinsky.fireyleafevents.services.CustomUserDetailsService;
import nl.benzelinsky.fireyleafevents.utils.JwtUtil;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin
@RestController
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;

    public AuthenticationController(AuthenticationManager authMan, JwtUtil jwtUtil, CustomUserDetailsService ud) {
        this.authenticationManager = authMan;
        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = ud;
    }

    // Return principal of logged in user
    @GetMapping(value = "/authenticated")
    public ResponseEntity<Object> authenticated(Authentication authentication, Principal principal) {
        return ResponseEntity.ok().body(principal);
    }

    // Return jwt token if correct login details given
    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        String username = authenticationRequest.getUsername();
        String password = authenticationRequest.getPassword();
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
        }
        catch (BadCredentialsException ex) {
            throw new Exception("Incorrect username or password.", ex);
        }
        final UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(username);
        final String jwt = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}