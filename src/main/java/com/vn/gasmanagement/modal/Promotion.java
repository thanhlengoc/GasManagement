package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Promontion")
public class Promotion {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private int id;

  private String dateIn;

  private int oil;
  private int sugar;
  private int glass;

  public int getId() { return id; }

  public void setId(int id) { this.id = id; }

  public String getDateIn() {
    return dateIn;
  }

  public void setDateIn(String dateIn) {
    this.dateIn = dateIn;
  }

  public int getOil() { return oil; }

  public void setOil(int oil) { this.oil = oil; }

  public int getSugar() { return sugar; }

  public void setSugar(int sugar) { this.sugar = sugar; }

  public int getGlass() { return glass; }

  public void setGlass(int glass) { this.glass = glass; }
}
