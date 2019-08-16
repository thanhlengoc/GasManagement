package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.springframework.data.annotation.TypeAlias;

@Entity
@Table(name = "PayShellDetail")
public class PayShellDetail {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private int id;

  @Column(name = "idPayShell")
  private int idPayShell;

  @Column(name = "idGas")
  private int idGas;

  private int amount;

  public int getId() { return id; }

  public void setId(int id) { this.id = id; }

  public int getIdPayShell() { return idPayShell; }

  public void setIdPayShell(int idPayShell) { this.idPayShell = idPayShell; }

  public int getIdGas() { return idGas; }

  public void setIdGas(int idGas) { this.idGas = idGas; }

  public int getAmount() { return amount; }

  public void setAmount(int amount) { this.amount = amount; }
}
