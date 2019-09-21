package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
public class Promotion {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private int id;

  private int oil;
  private int sugar;
  private int glass;

  private int priceOil;
  private int priceSugar;
  private int priceGlass;

  private int totalMoney;

  @OneToOne(mappedBy = "promotion")
  private Bill bill;

  @OneToOne(mappedBy = "promotion")
  private ImportCoupon importCoupon;

  public int getId() { return id; }

  public void setId(int id) { this.id = id; }

  public int getOil() { return oil; }

  public void setOil(int oil) { this.oil = oil; }

  public int getSugar() { return sugar; }

  public void setSugar(int sugar) { this.sugar = sugar; }

  public int getGlass() { return glass; }

  public void setGlass(int glass) { this.glass = glass; }

  public int getPriceOil() {
    return priceOil;
  }

  public void setPriceOil(int priceOil) {
    this.priceOil = priceOil;
  }

  public int getPriceSugar() {
    return priceSugar;
  }

  public void setPriceSugar(int priceSugar) {
    this.priceSugar = priceSugar;
  }

  public int getPriceGlass() {
    return priceGlass;
  }

  public void setPriceGlass(int priceGlass) {
    this.priceGlass = priceGlass;
  }

  public int getTotalMoney() {
    return totalMoney;
  }

  public void setTotalMoney(int totalMoney) {
    this.totalMoney = totalMoney;
  }

  public Bill getBill() {
    return bill;
  }

  public void setBill(Bill bill) {
    this.bill = bill;
  }

  public ImportCoupon getImportCoupon() {
    return importCoupon;
  }

  public void setImportCoupon(ImportCoupon importCoupon) {
    this.importCoupon = importCoupon;
  }
}
