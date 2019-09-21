package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "BillDetail")
public class BillDetail {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private Long id;

  private Long billId;

  private int gasId;

  private int amount;

  private Integer unitPrice;

  private int shellRegain;

  private int existEnd;

  public Long getId() { return id; }

  public void setId(Long id) { this.id = id; }

  public Long getBillId() { return billId; }

  public void setBillId(Long billId) { this.billId = billId; }

  public int getGasId() { return gasId; }

  public void setGasId(int gasId) { this.gasId = gasId; }

  public int getAmount() { return amount; }

  public void setAmount(int amount) { this.amount = amount; }

  public Integer getUnitPrice() { return unitPrice; }

  public void setUnitPrice(Integer unitPrice) { this.unitPrice = unitPrice; }

  public int getShellRegain() { return shellRegain; }

  public void setShellRegain(int shellRegain) { this.shellRegain = shellRegain; }

  public int getExistEnd() {
    return existEnd;
  }

  public void setExistEnd(int existEnd) {
    this.existEnd = existEnd;
  }
}
