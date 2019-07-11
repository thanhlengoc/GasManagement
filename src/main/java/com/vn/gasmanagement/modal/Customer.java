package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Customer")
public class Customer implements java.io.Serializable {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private Long id;

  @Column(name = "CustomerType")
  private String customerType;

  @Column(name = "CustomerName")
  private String customerName;

  @Column(name = "CustomerPhone")
  private String customerPhone;

  @Column(name = "CustomerEmail")
  private String customerEmail;

  @Column(name = "CustomerAddress")
  private String customerAddress;

  @Column(name = "StartDateBuy")
  private String startDateBuy;

  @Column(name = "lastPurchaseDate")
  private String lastPurchaseDate;

  @Column(name = "TotalPurchase")
  private int totalPurchase;

  @Column(name = "TotalScore")
  private int totalScore;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getCustomerType() {
    return customerType;
  }

  public void setCustomerType(String customerType) {
    this.customerType = customerType;
  }

  public String getCustomerName() {
    return customerName;
  }

  public void setCustomerName(String customerName) {
    this.customerName = customerName;
  }

  public String getCustomerPhone() {
    return customerPhone;
  }

  public void setCustomerPhone(String customerPhone) {
    this.customerPhone = customerPhone;
  }

  public String getCustomerEmail() {
    return customerEmail;
  }

  public void setCustomerEmail(String customerEmail) {
    this.customerEmail = customerEmail;
  }

  public String getCustomerAddress() {
    return customerAddress;
  }

  public void setCustomerAddress(String customerAddress) {
    this.customerAddress = customerAddress;
  }

  public String getStartDateBuy() {
    return startDateBuy;
  }

  public void setStartDateBuy(String startDateBuy) {
    this.startDateBuy = startDateBuy;
  }

  public String getLastPurchaseDate() { return lastPurchaseDate; }

  public void setLastPurchaseDate(String lastPurchaseDate) { this.lastPurchaseDate = lastPurchaseDate; }

  public int getTotalPurchase() {
    return totalPurchase;
  }

  public void setTotalPurchase(int totalPurchase) {
    this.totalPurchase = totalPurchase;
  }

  public int getTotalScore() {
    return totalScore;
  }

  public void setTotalScore(int totalScore) {
    this.totalScore = totalScore;
  }
}
