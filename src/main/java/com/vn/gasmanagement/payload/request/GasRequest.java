package com.vn.gasmanagement.payload.request;

public class GasRequest {

  private String gasName;
  private String code;
  private Float weight;
  private String color;
  private Long unitPriceIn;
  private Long unitPriceOut;

  public GasRequest(String gasName, String code, Float weight, String color,
      Long unitPriceIn, Long unitPriceOut) {
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

  public Long getUnitPriceIn() { return unitPriceIn; }

  public void setUnitPriceIn(Long unitPriceIn) { this.unitPriceIn = unitPriceIn; }

  public Long getUnitPriceOut() { return unitPriceOut; }

  public void setUnitPriceOut(Long unitPriceOut) { this.unitPriceOut = unitPriceOut; }
}
