package nl.benzelinsky.fireyleafevents.security;

import nl.benzelinsky.fireyleafevents.filter.JwtRequestFilter;
import nl.benzelinsky.fireyleafevents.services.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtRequestFilter jwtRequestFilter;
    private final PasswordEncoder passwordEncoder;

    public SecurityConfig(CustomUserDetailsService customUserDetailsService, JwtRequestFilter jwtRequestFilter, PasswordEncoder passwordEncoder) {
        this.customUserDetailsService = customUserDetailsService;
        this.jwtRequestFilter = jwtRequestFilter;
        this.passwordEncoder = passwordEncoder;
    }

    // Authentication with customUserDetailsService and passwordEncoder
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        var auth = new DaoAuthenticationProvider();
        auth.setPasswordEncoder(this.passwordEncoder);
        auth.setUserDetailsService(this.customUserDetailsService);
        return new ProviderManager(auth);
    }

    // Authorization with jwt
    @Bean
    protected SecurityFilterChain filterChain (HttpSecurity http) throws Exception {

        // JWT token authentication
        http
                .csrf(csrf -> csrf.disable())
                .httpBasic(basic -> basic.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth ->
                        auth
                                // Users
                                .requestMatchers(HttpMethod.POST, "/users").permitAll()
                                .requestMatchers(HttpMethod.POST,"/users/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/users/**").hasRole("ADMIN")
                                // Events
                                .requestMatchers(HttpMethod.POST, "/events").hasRole("USER") // Create event must be a user
                                .requestMatchers(HttpMethod.POST, "/events/*/join").hasRole("USER") // Join/leave event, must be  user
                                .requestMatchers(HttpMethod.POST, "/events/*/leave").hasRole("USER")
                                .requestMatchers(HttpMethod.POST, "/events/*/add-player/*").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.POST, "/events/*/remove-player/*").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PATCH, "/events/**").hasRole("USER") // User can update event
                                .requestMatchers(HttpMethod.PUT, "/events/**").hasRole("USER") // User can fully update
                                .requestMatchers(HttpMethod.DELETE, "/events").hasRole("ADMIN") // Delete all events
                                .requestMatchers(HttpMethod.DELETE, "/events/**").hasRole("ADMIN") // Delete event by id
                                // User profile
                                .requestMatchers(HttpMethod.GET, "/users/*").authenticated()
                                .requestMatchers(HttpMethod.PUT, "/users/*").authenticated()
                                .requestMatchers(HttpMethod.PATCH, "/users/*").authenticated()
                                // Games
                                .requestMatchers(HttpMethod.POST, "/games").hasAnyRole("USER", "ADMIN")
                                .requestMatchers(HttpMethod.PATCH, "/games/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT, "/games/**").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "/games").hasRole("ADMIN") // Delete all games
                                .requestMatchers(HttpMethod.DELETE, "/games/**").hasRole("ADMIN") // Delete game by id
                                // All GET
                                .requestMatchers(HttpMethod.GET, "/**").permitAll()
                                // Log in
                                .requestMatchers("/authenticated").authenticated()
                                .requestMatchers("/authenticate").permitAll()
                                .anyRequest().denyAll()
                )
                .sessionManagement(sesh -> sesh.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}