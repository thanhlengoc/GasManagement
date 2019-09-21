package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
public class ImportCouponDetail {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private int id;

  private int idImportCoupon;
  private int idGas;
  private int Amount;
  private int payShellAmount;
  private int debtShellAmount;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getIdImportCoupon() {
    return idImportCoupon;
  }

  public void setIdImportCoupon(int idImportCoupon) {
    this.idImportCoupon = idImportCoupon;
  }

  public int getIdGas() {
    return idGas;
  }

  public void setIdGas(int idGas) {
    this.idGas = idGas;
  }

  public int getAmount() {
    return Amount;
  }

  public void setAmount(int amount) {
    Amount = amount;
  }

  public int getPayShellAmount() { return payShellAmount; }

  public void setPayShellAmount(int payShellAmount) { this.payShellAmount = payShellAmount; }

  public int getDebtShellAmount() { return debtShellAmount; }

  public void setDebtShellAmount(int debtShellAmount) { this.debtShellAmount = debtShellAmount; }
}
