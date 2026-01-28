package nl.benzelinsky.filogames.exceptions;

public class UserAlreadyExistsException extends RuntimeException {
    public  UserAlreadyExistsException() {
        super();
    }

    public UserAlreadyExistsException(String existingField, String value) {
        super("A User already exists with " + existingField + " \"" + value + "\".");
    }
}
