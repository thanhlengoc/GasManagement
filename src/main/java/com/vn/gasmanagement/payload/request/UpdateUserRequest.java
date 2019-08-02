package com.vn.gasmanagement.payload.request;

public class UpdateUserRequest {

  private int userId;
  private String fullName;
  private String phoneNumber;
  private String address;
  private String cmnd;
  private String startDateWork;
  private String endDateWork;
  private String note;

  public UpdateUserRequest(int userId, String fullName, String phoneNumber, String address,
      String cmnd, String startDateWork, String note) {
    this.userId = userId;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.cmnd = cmnd;
    this.startDateWork = startDateWork;
    this.note = note;
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

  public String getCmnd() {
    return cmnd;
  }

  public void setCmnd(String cmnd) {
    this.cmnd = cmnd;
  }

  public String getStartDateWork() {
    return startDateWork;
  }

  public void setStartDateWork(String startDateWork) {
    this.startDateWork = startDateWork;
  }

  public String getEndDateWork() {
    return endDateWork;
  }

  public void setEndDateWork(String endDateWork) {
    this.endDateWork = endDateWork;
  }

  public String getNote() {
    return note;
  }

  public void setNote(String note) {
    this.note = note;
  }
}
