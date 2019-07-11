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

  private Long unitPrice;

  public Long getId() { return id; }

  public void setId(Long id) { this.id = id; }

  public Long getBillId() { return billId; }

  public void setBillId(Long billId) { this.billId = billId; }

  public int getGasId() { return gasId; }

  public void setGasId(int gasId) { this.gasId = gasId; }

  public int getAmount() { return amount; }

  public void setAmount(int amount) { this.amount = amount; }

  public Long getUnitPrice() { return unitPrice; }

  public void setUnitPrice(Long unitPrice) { this.unitPrice = unitPrice; }
}
