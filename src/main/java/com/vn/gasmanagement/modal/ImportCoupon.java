package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ImportCoupon")
public class ImportCoupon implements java.io.Serializable {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private int id;

  private int idPayShell;

  private int idDebt;

  @Column(name = "dateAdded")
  private Date dateAdded;

  @Column(name = "personAdded")
  private String personAdded;

  @Column(name = "totalAmount")
  private int totalAmount;

  @Column(name = "totalMoney")
  private Long totalMoney;

  private Long payment;

  private String other;

  private String note;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getIdPayShell() {
    return idPayShell;
  }

  public void setIdPayShell(int idPayShell) {
    this.idPayShell = idPayShell;
  }

  public int getIdDebt() { return idDebt; }

  public void setIdDebt(int idDebt) { this.idDebt = idDebt; }

  public Date getDateAdded() { return dateAdded; }

  public void setDateAdded(Date dateAdded) { this.dateAdded = dateAdded; }

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

  public Long getTotalMoney() {
    return totalMoney;
  }

  public void setTotalMoney(Long totalMoney) {
    this.totalMoney = totalMoney;
  }

  public Long getPayment() { return payment; }

  public void setPayment(Long payment) { this.payment = payment; }

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
}
