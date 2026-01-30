package nl.benzelinsky.filogames.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Record not found exception handler
    @ExceptionHandler(RecordNotFoundException.class)
    public ResponseEntity<String> handleRecordNotFoundException( RecordNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    //Method argument not valid exception handler
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(
                er -> errors.put(er.getField(), er.getDefaultMessage())
        );
        return ResponseEntity.badRequest().body(errors);
    }

    //Http request method not supported
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<String> handleMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body("You can't do that!\nMethod: " + ex.getMethod());
    }

    //Username not found
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    //Bad request
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<String> handleBadRequestException(BadRequestException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    //User already joined Event
    @ExceptionHandler(UserAlreadyJoinedEventException.class)
    public ResponseEntity<String> handleUserAlreadyJoinedEventException(UserAlreadyJoinedEventException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    //Username unavailable
    @ExceptionHandler(UsernameUnavailableException.class)
    public ResponseEntity<String> handleUsernameUnavailableException(UsernameUnavailableException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    //User already exists
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    //Event full
    @ExceptionHandler(EventFullException.class)
    public ResponseEntity<String> handleEventFullException(EventFullException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    //Not a player in selected event
    @ExceptionHandler(NotAPlayerException.class)
    public ResponseEntity<String> handleNotAPlayerException(NotAPlayerException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    //Game still has events when deleting
    @ExceptionHandler(HasActiveEventsException.class)
    public ResponseEntity<String> handleHasActiveEventsException(HasActiveEventsException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    //Game is already associated with event
    @ExceptionHandler(GameAlreadyAssignedToEventException.class)
    public ResponseEntity<String> handleGameAlreadyAssignedToEventException(GameAlreadyAssignedToEventException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    //User already hosting event
    @ExceptionHandler(AlreadyHostingException.class)
    public ResponseEntity<String> handleAlreadyHostingException(AlreadyHostingException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    //Not allowed to change username
    @ExceptionHandler(MayNotChangeUsernameException.class)
    public ResponseEntity<String> handleMayNotChangeUsernameException(MayNotChangeUsernameException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    //Role not found
    @ExceptionHandler(RoleNotFoundException.class)
    public ResponseEntity<String> handleRoleNotFoundException(RoleNotFoundException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    //Current user cannot remove their own admin role
    @ExceptionHandler(AdminCannotRemoveOwnAdminRoleException.class)
    public ResponseEntity<String> handleAdminCannotRemoveOwnAdminRoleException(AdminCannotRemoveOwnAdminRoleException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    //Can't remove USER if user is currently in events.
    @ExceptionHandler(CannotRemoveUserRoleFromActiveUserException.class)
    public ResponseEntity<String> handleCannotRemoveUserRoleFromActiveUserException(CannotRemoveUserRoleFromActiveUserException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    //User already has role
    @ExceptionHandler(AlreadyHasRoleException.class)
    public ResponseEntity<String> handleAlreadyHasRoleException(AlreadyHasRoleException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    //Max upload size exceeded
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<String> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException ex) {
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(ex.getMessage());
    }
}