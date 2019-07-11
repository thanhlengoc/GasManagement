package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PayShell")
public class PayShell implements java.io.Serializable {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private int id;

  @Column(name = "datePay")
  private String datePay;

  @Column(name = "totalShell")
  private int totalShell;

  private String note;

  public int getId() { return id; }

  public void setId(int id) { this.id = id; }

  public String getDatePay() { return datePay; }

  public void setDatePay(String datePay) { this.datePay = datePay; }

  public int getTotalShell() { return totalShell; }

  public void setTotalShell(int totalShell) { this.totalShell = totalShell; }

  public String getNote() { return note; }

  public void setNote(String note) { this.note = note; }
}
