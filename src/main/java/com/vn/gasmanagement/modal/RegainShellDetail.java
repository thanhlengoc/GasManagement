package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RegainShellDetail")
public class RegainShellDetail {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private int id;

  private int regainShellId;
  private int gasId;
  private int amount;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getRegainShellId() {
    return regainShellId;
  }

  public void setRegainShellId(int regainShellId) {
    this.regainShellId = regainShellId;
  }

  public int getGasId() {
    return gasId;
  }

  public void setGasId(int gasId) {
    this.gasId = gasId;
  }

  public int getAmount() {
    return amount;
  }

  public void setAmount(int amount) {
    this.amount = amount;
  }
}
