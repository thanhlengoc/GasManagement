package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
public class Account {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private int id;

  private String username;
  private String password;
  private String passwordDecode;

  @ManyToOne
  @JoinColumn
  private Role role;

  private boolean enable;

  public int getId() { return id; }

  public void setId(int id) { this.id = id; }

  public String getUsername() { return username; }

  public void setUsername(String username) { this.username = username; }

  public String getPassword() { return password; }

  public void setPassword(String password) { this.password = password; }

  public Role getRole() { return role; }

  public void setRole(Role role) { this.role = role; }

  public boolean isEnable() { return enable; }

  public void setEnable(boolean enable) { this.enable = enable; }

  public String getPasswordDecode() {
    return passwordDecode;
  }

  public void setPasswordDecode(String passwordDecode) {
    this.passwordDecode = passwordDecode;
  }
}
