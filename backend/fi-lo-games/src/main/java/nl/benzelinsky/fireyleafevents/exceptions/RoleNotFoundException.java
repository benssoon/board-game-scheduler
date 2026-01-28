package nl.benzelinsky.fireyleafevents.exceptions;

import nl.benzelinsky.fireyleafevents.models.Role;

public class RoleNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public RoleNotFoundException(String username, String role) {
        super("User " + username + " does not have role " + role + ".");
    }
}