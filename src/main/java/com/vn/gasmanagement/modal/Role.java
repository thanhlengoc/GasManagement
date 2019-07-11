package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Role")
public class Role implements java.io.Serializable {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private int id;

  @Column(name = "RoleName", unique = true)
  private String roleName;

  @Column(name = "xoaFlag")
  private boolean xoaFlag;

  @OneToOne(mappedBy = "role")
  private Account account;

  public Role() { }

  public Role(String roleName) {
    this.roleName = roleName;
  }

  public int getId() { return id; }

  public void setId(int id) { this.id = id; }

  public String getRoleName() {
    return roleName;
  }

  public void setRoleName(String roleName) {
    this.roleName = roleName;
  }

  public boolean isXoaFlag() { return xoaFlag; }

  public void setXoaFlag(boolean xoaFlag) { this.xoaFlag = xoaFlag; }

  public Account getAccount() { return account; }

  public void setAccount(Account account) { this.account = account; }
}
