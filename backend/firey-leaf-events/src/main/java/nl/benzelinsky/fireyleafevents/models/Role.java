package nl.benzelinsky.fireyleafevents.models;

import jakarta.persistence.*;

import java.io.Serializable;

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

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
