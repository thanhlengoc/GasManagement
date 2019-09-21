package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class OtherItem {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "id", unique = true, nullable = false)
  private int id;

  private int valve;
  private int stove;
  private int torch;

//  @OneToMany(mappedBy = "otherItem", cascade = CascadeType.ALL)
//  private Set<Bill> bills;
//
//  @OneToMany(mappedBy = "otherItem", cascade = CascadeType.ALL)
//  private Set<ImportCoupon> importCoupons;

  public int getId() { return id; }

  public void setId(int id) { this.id = id; }

  public int getValve() {
    return valve;
  }

  public void setValve(int valve) {
    this.valve = valve;
  }

  public int getStove() {
    return stove;
  }

  public void setStove(int stove) {
    this.stove = stove;
  }

  public int getTorch() {
    return torch;
  }

  public void setTorch(int torch) {
    this.torch = torch;
  }

}
