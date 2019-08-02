package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
public class Bill implements java.io.Serializable {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private Long id;

  @Column(name = "UserSale")
  private int userSale;

  @Column(name = "CustomerPurchase")
  private int customerPurchase;

  @Column(name = "InvoiceDate")
  private String invoiceDate;

  @Column(name = "TotalAmount")
  private int totalAmount;

  @Column(name = "TotalMoney")
  private Long totalMoney;

  private Float discount;

  private String note;

  public Long getId() { return id; }

  public void setId(Long id) { this.id = id; }

  public int getUserSale() { return userSale; }

  public void setUserSale(int userSale) { this.userSale = userSale; }

  public int getCustomerPurchase() { return customerPurchase; }

  public void setCustomerPurchase(int customerPurchase) { this.customerPurchase = customerPurchase; }

  public String getInvoiceDate() { return invoiceDate; }

  public void setInvoiceDate(String invoiceDate) { this.invoiceDate = invoiceDate; }

  public int getTotalAmount() {
    return totalAmount;
  }

  public void setTotalAmount(int totalAmount) {
    this.totalAmount = totalAmount;
  }

  public Long getTotalMoney() { return totalMoney; }

  public void setTotalMoney(Long totalMoney) { this.totalMoney = totalMoney; }

  public Float getDiscount() {
    return discount;
  }

  public void setDiscount(Float discount) {
    this.discount = discount;
  }

  public String getNote() {
    return note;
  }

  public void setNote(String note) {
    this.note = note;
  }
}
