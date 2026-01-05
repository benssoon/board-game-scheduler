package nl.benzelinsky.fireyleafevents.exceptions;

public class CannotRemoveUserRoleFromActiveUserException extends RuntimeException {
    public CannotRemoveUserRoleFromActiveUserException() {
        super("You may not remove the USER role from a user that is still participating in or hosting events. Please remove them from those events first.");
    }
}
