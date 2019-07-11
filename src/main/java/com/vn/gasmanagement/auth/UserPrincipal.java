package com.vn.gasmanagement.auth;

import com.vn.gasmanagement.modal.Account;
import com.vn.gasmanagement.modal.Role;
import com.vn.gasmanagement.modal.User;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserPrincipal implements UserDetails {

  private int userId;
  private String username;
  private String password;
  private String fullName;
  private String phoneNumber;
  private String cmnd;
  private String address;
  private String startDateWork;
  private Set<? extends GrantedAuthority> grantedAuthorities;


  public UserPrincipal(int userId, String username, String password, String fullName,
      String phoneNumber, String cmnd, String address, String startDateWork,
      Set<? extends GrantedAuthority> grantedAuthorities) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.cmnd = cmnd;
    this.address = address;
    this.startDateWork = startDateWork;
    this.grantedAuthorities = grantedAuthorities;
  }

  public static UserPrincipal create(Account account, User user) {
    Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
    Role role = account.getRole();
    grantedAuthorities.add(new SimpleGrantedAuthority(role.getRoleName()));
    return new UserPrincipal(user.getId(),
                              account.getUsername(),
                              account.getPassword(),
                              user.getFullName(),
                              user.getPhoneNumber(),
                              user.getCmnd(),
                              user.getAddress(),
                              user.getStartDateWork(),
                              grantedAuthorities
    );
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  @Override
  public String getPassword() { return password; }

  @Override
  public String getUsername() { return username; }

  @Override
  public boolean isAccountNonExpired() { return true; }

  @Override
  public boolean isAccountNonLocked() { return true; }

  @Override
  public boolean isCredentialsNonExpired() { return true; }

  @Override
  public boolean isEnabled() { return true; }

  public int getUserId() { return userId; }

  public void setUserId(int userId) { this.userId = userId; }

  public void setUsername(String username) { this.username = username; }

  public void setPassword(String password) { this.password = password; }

  public String getFullName() { return fullName; }

  public void setFullName(String fullName) { this.fullName = fullName; }

  public String getPhoneNumber() { return phoneNumber; }

  public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

  public String getCmnd() { return cmnd; }

  public void setCmnd(String cmnd) { this.cmnd = cmnd; }

  public String getAddress() { return address; }

  public void setAddress(String address) { this.address = address; }

  public String getStartDateWork() { return startDateWork; }

  public void setStartDateWork(String startDateWork) { this.startDateWork = startDateWork; }

  public Set<? extends GrantedAuthority> getGrantedAuthorities() {
    return grantedAuthorities;
  }

  public void setGrantedAuthorities(Set<? extends GrantedAuthority> grantedAuthorities) {
    this.grantedAuthorities = grantedAuthorities;
  }
}
