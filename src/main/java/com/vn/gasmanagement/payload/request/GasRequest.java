package com.vn.gasmanagement.payload.request;

public class GasRequest {

  private String gasName;
  private String code;
  private Float weight;
  private String color;
  private Integer unitPriceIn;
  private Integer unitPriceOut;

  public GasRequest(String gasName, String code, Float weight, String color,
      Integer unitPriceIn, Integer unitPriceOut) {
    this.gasName = gasName;
    this.code = code;
    this.weight = weight;
    this.color = color;
    this.unitPriceIn = unitPriceIn;
    this.unitPriceOut = unitPriceOut;
  }

  public String getGasName() {
    return gasName;
  }

  public void setGasName(String gasName) {
    this.gasName = gasName;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public Float getWeight() {
    return weight;
  }

  public void setWeight(Float weight) {
    this.weight = weight;
  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public Integer getUnitPriceIn() {
    return unitPriceIn;
  }

  public void setUnitPriceIn(Integer unitPriceIn) {
    this.unitPriceIn = unitPriceIn;
  }

  public Integer getUnitPriceOut() {
    return unitPriceOut;
  }

  public void setUnitPriceOut(Integer unitPriceOut) {
    this.unitPriceOut = unitPriceOut;
  }
}
