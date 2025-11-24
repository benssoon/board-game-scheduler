package nl.benzelinsky.fireyleafevents.exceptions;

import nl.benzelinsky.fireyleafevents.models.Role;

public class RoleNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public RoleNotFoundException(String role) {
        super("Role " + role + " does not exist.");
    }
}