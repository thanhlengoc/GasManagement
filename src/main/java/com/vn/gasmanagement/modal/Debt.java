package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Debt")
public class Debt implements java.io.Serializable {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private int id;

  @Column(name = "debtMoney")
  private Long debtMoney;

  @Column(name = "debtOther")
  private String debtOther;

  private String note;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public Long getDebtMoney() {
    return debtMoney;
  }

  public void setDebtMoney(Long debtMoney) {
    this.debtMoney = debtMoney;
  }

  public String getDebtOther() {
    return debtOther;
  }

  public void setDebtOther(String debtOther) {
    this.debtOther = debtOther;
  }

  public String getNote() {
    return note;
  }

  public void setNote(String note) {
    this.note = note;
  }
}
