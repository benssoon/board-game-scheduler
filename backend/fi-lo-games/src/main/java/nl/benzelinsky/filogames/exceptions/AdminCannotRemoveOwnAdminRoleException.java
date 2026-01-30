package nl.benzelinsky.filogames.exceptions;

public class AdminCannotRemoveOwnAdminRoleException extends RuntimeException {
    public AdminCannotRemoveOwnAdminRoleException() {
        super("Only another user with role ADMIN can remove your ADMIN role.");
    }
}
