package nl.benzelinsky.filogames.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Getter
@Entity
@IdClass(RoleKey.class)
@Table(name = "roles")
public class Role implements Serializable {
    @Id
    @Column(nullable = false)
    private String username;

    @Id
    @Column(nullable = false)
    private String role;

    public Role() {
    }
    public Role(String username, String role) {
        this.username = username;
        this.role = role;
    }

}
