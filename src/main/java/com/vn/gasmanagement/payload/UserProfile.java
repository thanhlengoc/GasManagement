package com.vn.gasmanagement.payload;

import java.util.Set;
import org.springframework.security.core.GrantedAuthority;

public class UserProfile {

  private int userId;
  private String fullName;
  private String cmnd;
  private String phoneNumber;
  private String address;
  private String startDateWork;
  private Set<? extends GrantedAuthority> roles;

  public UserProfile(int userId, String fullName, String cmnd, String phoneNumber,
      String address, String startDateWork,
      Set<? extends GrantedAuthority> roles) {
    this.userId = userId;
    this.fullName = fullName;
    this.cmnd = cmnd;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.startDateWork = startDateWork;
    this.roles = roles;
  }

  public int getUserId() {
    return userId;
  }

  public void setUserId(int userId) {
    this.userId = userId;
  }

  public String getFullName() {
    return fullName;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  public String getCmnd() {
    return cmnd;
  }

  public void setCmnd(String cmnd) {
    this.cmnd = cmnd;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getStartDateWork() {
    return startDateWork;
  }

  public void setStartDateWork(String startDateWork) {
    this.startDateWork = startDateWork;
  }

  public Set<? extends GrantedAuthority> getRoles() {
    return roles;
  }

  public void setRoles(Set<? extends GrantedAuthority> roles) {
    this.roles = roles;
  }
}
