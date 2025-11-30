package nl.benzelinsky.fireyleafevents.exceptions;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class AlreadyHasRoleException extends RuntimeException {
    public AlreadyHasRoleException(String message) {
        super(message);
    }
    public AlreadyHasRoleException(String username, String roleName) {
        super("User with username " + username + " already has role " + roleName);
    }
}
