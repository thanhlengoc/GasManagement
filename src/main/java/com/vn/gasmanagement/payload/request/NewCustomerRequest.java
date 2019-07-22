package com.vn.gasmanagement.payload.request;

public class NewCustomerRequest {

  private String cusType;
  private String cusName;
  private String cusPhone;
  private String cusAddress;
  private String startBuy;
  private String lastBuy;
  private String note;

  public NewCustomerRequest(String cusType, String cusName, String cusPhone,
      String cusAddress, String startBuy, String lastBuy, String note) {
    this.cusType = cusType;
    this.cusName = cusName;
    this.cusPhone = cusPhone;
    this.cusAddress = cusAddress;
    this.startBuy = startBuy;
    this.lastBuy = lastBuy;
    this.note = note;
  }

  public String getCusType() {
    return cusType;
  }

  public void setCusType(String cusType) {
    this.cusType = cusType;
  }

  public String getCusName() {
    return cusName;
  }

  public void setCusName(String cusName) {
    this.cusName = cusName;
  }

  public String getCusPhone() {
    return cusPhone;
  }

  public void setCusPhone(String cusPhone) {
    this.cusPhone = cusPhone;
  }

  public String getCusAddress() {
    return cusAddress;
  }

  public void setCusAddress(String cusAddress) {
    this.cusAddress = cusAddress;
  }

  public String getStartBuy() {
    return startBuy;
  }

  public void setStartBuy(String startBuy) {
    this.startBuy = startBuy;
  }

  public String getLastBuy() {
    return lastBuy;
  }

  public void setLastBuy(String lastBuy) {
    this.lastBuy = lastBuy;
  }

  public String getNote() {
    return note;
  }

  public void setNote(String note) {
    this.note = note;
  }
}
