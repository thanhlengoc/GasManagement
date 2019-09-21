package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
public class Bill {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private Long id;

  @Column(name = "UserSale")
  private String userSale;

  @Column(name = "CustomerPurchase")
  private int customerPurchase;

  @Column(name = "InvoiceDate")
  private Date invoiceDate;

  @Column(name = "TotalAmount")
  private int totalAmount;

  @Column(name = "TotalMoney")
  private Integer totalMoney;

  private int totalShellRegain;

  private int totalExistEnd;

  private Float discount;

  private int valve;
  private int priceValveOut;
  private int stove;
  private int priceStoveOut;
  private int torch;
  private int priceTorchOut;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "promotion_id", referencedColumnName = "id")
  private Promotion promotion;

  private String note;

  private String otherFeeContent;
  private int otherFee;

  public Long getId() { return id; }

  public void setId(Long id) { this.id = id; }

  public String getUserSale() { return userSale; }

  public void setUserSale(String userSale) { this.userSale = userSale; }

  public int getCustomerPurchase() { return customerPurchase; }

  public void setCustomerPurchase(int customerPurchase) { this.customerPurchase = customerPurchase; }

  public Date getInvoiceDate() { return invoiceDate; }

  public void setInvoiceDate(Date invoiceDate) { this.invoiceDate = invoiceDate; }

  public int getTotalAmount() {
    return totalAmount;
  }

  public void setTotalAmount(int totalAmount) {
    this.totalAmount = totalAmount;
  }

  public Integer getTotalMoney() { return totalMoney; }

  public void setTotalMoney(Integer totalMoney) { this.totalMoney = totalMoney; }

  public int getTotalShellRegain() {
    return totalShellRegain;
  }

  public void setTotalShellRegain(int totalShellRegain) {
    this.totalShellRegain = totalShellRegain;
  }

  public int getTotalExistEnd() {
    return totalExistEnd;
  }

  public void setTotalExistEnd(int totalExistEnd) {
    this.totalExistEnd = totalExistEnd;
  }

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

  public int getValve() {
    return valve;
  }

  public void setValve(int valve) {
    this.valve = valve;
  }

  public int getStove() {
    return stove;
  }

  public void setStove(int stove) {
    this.stove = stove;
  }

  public int getTorch() {
    return torch;
  }

  public void setTorch(int torch) {
    this.torch = torch;
  }

  public int getPriceValveOut() {
    return priceValveOut;
  }

  public void setPriceValveOut(int priceValveOut) {
    this.priceValveOut = priceValveOut;
  }

  public int getPriceStoveOut() {
    return priceStoveOut;
  }

  public void setPriceStoveOut(int priceStoveOut) {
    this.priceStoveOut = priceStoveOut;
  }

  public int getPriceTorchOut() {
    return priceTorchOut;
  }

  public void setPriceTorchOut(int priceTorchOut) {
    this.priceTorchOut = priceTorchOut;
  }

  public Promotion getPromotion() {
    return promotion;
  }

  public void setPromotion(Promotion promotion) {
    this.promotion = promotion;
  }

  public String getOtherFeeContent() {
    return otherFeeContent;
  }

  public void setOtherFeeContent(String otherFeeContent) {
    this.otherFeeContent = otherFeeContent;
  }

  public int getOtherFee() {
    return otherFee;
  }

  public void setOtherFee(int otherFee) {
    this.otherFee = otherFee;
  }
}
