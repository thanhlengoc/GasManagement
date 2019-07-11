package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "User")
public class User implements java.io.Serializable {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private int id;

  @Column(name = "AccountId", unique = true, nullable = false)
  private int accountId;

  @Column(name = "FullName", nullable = false)
  private String fullName;

  @Column(name = "PhoneNumber", nullable = false)
  private String phoneNumber;

  @Column(name = "CMND")
  private String cmnd;

  @Column(name = "Address", nullable = false)
  private String address;

  @Column(name = "StartDateWork")
  private String startDateWork;

  @Column(name = "EndDateWork")
  private String endDateWork;

  private String note;

  @Column(name = "deleteTime")
  private String deleteTime;

  public int getId() { return id; }

  public void setId(int id) { this.id = id; }

  public int getAccountId() { return accountId; }

  public void setAccountId(int accountId) { this.accountId = accountId; }

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

  public String getEndDateWork() { return endDateWork; }

  public void setEndDateWork(String endDateWork) { this.endDateWork = endDateWork; }

  public String getNote() {
    return note;
  }

  public void setNote(String note) {
    this.note = note;
  }

  public String getDeleteTime() {
    return deleteTime;
  }

  public void setDeleteTime(String deleteTime) {
    this.deleteTime = deleteTime;
  }
}
