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

@Entity
public class ImportCoupon {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private int id;

  @Column(name = "dateAdded")
  private Date dateAdded;

  private Long dateAddedMilisec;

  @Column(name = "personAdded")
  private String personAdded;

  @Column(name = "totalAmount")
  private int totalAmount;

  @Column(name = "totalMoney")
  private Integer totalMoney;

  private Integer payment;

  private int valve;
  private int stove;
  private int torch;

  private int priceValveIn;
  private int priceStoveIn;
  private int priceTorchIn;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "promotion_id", referencedColumnName = "id")
  private Promotion promotion;

  private int totalShellPay;
  private int totalDebt;
  private int debtMoney;
  private String other;
  private String note;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public Date getDateAdded() { return dateAdded; }

  public void setDateAdded(Date dateAdded) { this.dateAdded = dateAdded; }

  public Long getDateAddedMilisec() {
    return dateAddedMilisec;
  }

  public void setDateAddedMilisec(Long dateAddedMilisec) {
    this.dateAddedMilisec = dateAddedMilisec;
  }

  public String getPersonAdded() {
    return personAdded;
  }

  public void setPersonAdded(String personAdded) {
    this.personAdded = personAdded;
  }

  public int getTotalAmount() {
    return totalAmount;
  }

  public void setTotalAmount(int totalAmount) {
    this.totalAmount = totalAmount;
  }

  public Integer getTotalMoney() {
    return totalMoney;
  }

  public void setTotalMoney(Integer totalMoney) {
    this.totalMoney = totalMoney;
  }

  public Integer getPayment() { return payment; }

  public void setPayment(Integer payment) { this.payment = payment; }

  public int getTotalShellPay() { return totalShellPay; }

  public void setTotalShellPay(int totalShellPay) { this.totalShellPay = totalShellPay; }

  public int getTotalDebt() { return totalDebt; }

  public void setTotalDebt(int totalDebt) { this.totalDebt = totalDebt; }

  public int getDebtMoney() { return debtMoney; }

  public void setDebtMoney(int debtMoney) { this.debtMoney = debtMoney; }

  public String getOther() {
    return other;
  }

  public void setOther(String other) {
    this.other = other;
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

  public int getPriceValveIn() {
    return priceValveIn;
  }

  public void setPriceValveIn(int priceValveIn) {
    this.priceValveIn = priceValveIn;
  }

  public int getPriceStoveIn() {
    return priceStoveIn;
  }

  public void setPriceStoveIn(int priceStoveIn) {
    this.priceStoveIn = priceStoveIn;
  }

  public int getPriceTorchIn() {
    return priceTorchIn;
  }

  public void setPriceTorchIn(int priceTorchIn) {
    this.priceTorchIn = priceTorchIn;
  }

  public Promotion getPromotion() {
    return promotion;
  }

  public void setPromotion(Promotion promotion) {
    this.promotion = promotion;
  }
}
