package nl.benzelinsky.fireyleafevents.exceptions;

public class AdminCannotRemoveOwnAdminRoleException extends RuntimeException {
    public AdminCannotRemoveOwnAdminRoleException() {
        super("Only another user with role ADMIN can remove your ADMIN role");
    }
}
