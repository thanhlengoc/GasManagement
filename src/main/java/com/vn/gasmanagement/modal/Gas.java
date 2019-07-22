package com.vn.gasmanagement.modal;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Gas")
public class Gas implements java.io.Serializable {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  @Column(name = "Id", unique = true, nullable = false)
  private int id;

  @Column(name = "Code")
  private String code;

  @Column(name = "GasName")
  private String gasName;

  @Column(name = "Weight")
  private Float weight;

  @Column(name = "color")
  private String color;

  @Column(name = "unitPriceIn")
  private Long unitPriceIn;

  private Long unitPriceOut;

  private String gasTypeName;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getGasName() { return gasName; }

  public void setGasName(String gasName) { this.gasName = gasName; }

  public Float getWeight() {
    return weight;
  }

  public void setWeight(Float weight) { this.weight = weight; }

  public String getColor() { return color; }

  public void setColor(String color) { this.color = color; }

  public Long getUnitPriceIn() { return unitPriceIn; }

  public void setUnitPriceIn(Long unitPriceIn) { this.unitPriceIn = unitPriceIn; }

  public Long getUnitPriceOut() { return unitPriceOut; }

  public void setUnitPriceOut(Long unitPriceOut) { this.unitPriceOut = unitPriceOut; }

  public String getGasTypeName() { return gasTypeName; }

  public void setGasTypeName(String gasTypeName) { this.gasTypeName = gasTypeName; }
}
