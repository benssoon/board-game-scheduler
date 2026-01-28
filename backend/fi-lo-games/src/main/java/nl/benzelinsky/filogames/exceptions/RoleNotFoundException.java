package nl.benzelinsky.filogames.exceptions;

public class RoleNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public RoleNotFoundException(String username, String role) {
        super("User " + username + " does not have role " + role + ".");
    }
}