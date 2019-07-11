package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "DebtDetail")
public class DebtDetail implements java.io.Serializable {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private int id;

  @Column(name = "debtId")
  private int debtId;

  @Column(name = "gasId")
  private int gasId;

  private int amount;

  public int getId() { return id; }

  public void setId(int id) { this.id = id; }

  public int getDebtId() { return debtId; }

  public void setDebtId(int debtId) { this.debtId = debtId; }

  public int getGasId() { return gasId; }

  public void setGasId(int gasId) { this.gasId = gasId; }

  public int getAmount() { return amount; }

  public void setAmount(int amount) { this.amount = amount; }
}
