package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class OtherItem {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private int id;

  @Column(unique = true)
  private int itemName;
  private Long unitPriceIn;
  private Long unitPriceOut;

  public int getId() { return id; }

  public void setId(int id) { this.id = id; }

  public int getItemName() { return itemName; }

  public void setItemName(int itemName) { this.itemName = itemName; }

  public Long getUnitPriceIn() { return unitPriceIn; }

  public void setUnitPriceIn(Long unitPriceIn) { this.unitPriceIn = unitPriceIn; }

  public Long getUnitPriceOut() { return unitPriceOut; }

  public void setUnitPriceOut(Long unitPriceOut) { this.unitPriceOut = unitPriceOut; }
}
