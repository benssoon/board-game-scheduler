package nl.benzelinsky.fireyleafevents.exceptions;

public class RecordNotFoundException extends RuntimeException {
    public RecordNotFoundException() {
        super();
    }

    public RecordNotFoundException(String message) {
        super(message);
    }

    public RecordNotFoundException(String type, Long id) {
        super(type + " not found with id: " + id);
    }
}
