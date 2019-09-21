package com.vn.gasmanagement.payload.request;

import com.vn.gasmanagement.modal.Promotion;

public class InvoiceRequest {
  private String dateOut;
  private String userSale;
  private int customerPurchase;
  private Float discount;
  private int elf6kg;
  private int elf12kg;
  private int elf39kg;
  private int b12;
  private int b45;
  private int total12;
  private int valve;
  private int stove;
  private int torch;
  private int priceValve;
  private int priceStove;
  private int priceTorch;
  private String priceElf6;
  private String priceElf12;
  private String priceElf39;
  private String priceB12;
  private String priceB45;
  private String priceTotal12;
  private String otherFeeContent;
  private int otherFee;
  private int regainElf6kg;
  private int regainElf12kg;
  private int regainElf39kg;
  private int regainB12;
  private int regainB45;
  private int regainTotal12;
  private Promotion promotion;
  private Long totalMoney;
  private Long payment;
  private String note;

  public String getDateOut() {
    return dateOut;
  }

  public void setDateOut(String dateOut) {
    this.dateOut = dateOut;
  }

  public String getUserSale() {
    return userSale;
  }

  public void setUserSale(String userSale) {
    this.userSale = userSale;
  }

  public int getCustomerPurchase() {
    return customerPurchase;
  }

  public void setCustomerPurchase(int customerPurchase) {
    this.customerPurchase = customerPurchase;
  }

  public Float getDiscount() {
    return discount;
  }

  public void setDiscount(Float discount) {
    this.discount = discount;
  }

  public int getElf6kg() {
    return elf6kg;
  }

  public void setElf6kg(int elf6kg) {
    this.elf6kg = elf6kg;
  }

  public int getElf12kg() {
    return elf12kg;
  }

  public void setElf12kg(int elf12kg) {
    this.elf12kg = elf12kg;
  }

  public int getElf39kg() {
    return elf39kg;
  }

  public void setElf39kg(int elf39kg) {
    this.elf39kg = elf39kg;
  }

  public int getB12() {
    return b12;
  }

  public void setB12(int b12) {
    this.b12 = b12;
  }

  public int getB45() {
    return b45;
  }

  public void setB45(int b45) {
    this.b45 = b45;
  }

  public String getOtherFeeContent() {
    return otherFeeContent;
  }

  public void setOtherFeeContent(String otherFeeContent) {
    this.otherFeeContent = otherFeeContent;
  }

  public int getOtherFee() {
    return otherFee;
  }

  public void setOtherFee(int otherFee) {
    this.otherFee = otherFee;
  }

  public int getTotal12() { return total12; }

  public void setTotal12(int total12) { this.total12 = total12; }

  public String getPriceElf6() {
    return priceElf6;
  }

  public void setPriceElf6(String priceElf6) {
    this.priceElf6 = priceElf6;
  }

  public String getPriceElf12() {
    return priceElf12;
  }

  public void setPriceElf12(String priceElf12) {
    this.priceElf12 = priceElf12;
  }

  public String getPriceElf39() {
    return priceElf39;
  }

  public void setPriceElf39(String priceElf39) {
    this.priceElf39 = priceElf39;
  }

  public String getPriceB12() {
    return priceB12;
  }

  public void setPriceB12(String priceB12) {
    this.priceB12 = priceB12;
  }

  public String getPriceB45() {
    return priceB45;
  }

  public void setPriceB45(String priceB45) {
    this.priceB45 = priceB45;
  }

  public String getPriceTotal12() {
    return priceTotal12;
  }

  public void setPriceTotal12(String priceTotal12) {
    this.priceTotal12 = priceTotal12;
  }

  public int getRegainElf6kg() {
    return regainElf6kg;
  }

  public void setRegainElf6kg(int regainElf6kg) {
    this.regainElf6kg = regainElf6kg;
  }

  public int getRegainElf12kg() {
    return regainElf12kg;
  }

  public void setRegainElf12kg(int regainElf12kg) {
    this.regainElf12kg = regainElf12kg;
  }

  public int getRegainElf39kg() {
    return regainElf39kg;
  }

  public void setRegainElf39kg(int regainElf39kg) {
    this.regainElf39kg = regainElf39kg;
  }

  public int getRegainB12() {
    return regainB12;
  }

  public void setRegainB12(int regainB12) {
    this.regainB12 = regainB12;
  }

  public int getRegainB45() {
    return regainB45;
  }

  public void setRegainB45(int regainB45) {
    this.regainB45 = regainB45;
  }

  public Long getTotalMoney() {
    return totalMoney;
  }

  public void setTotalMoney(Long totalMoney) {
    this.totalMoney = totalMoney;
  }

  public Long getPayment() {
    return payment;
  }

  public void setPayment(Long payment) {
    this.payment = payment;
  }

  public String getNote() {
    return note;
  }

  public void setNote(String note) {
    this.note = note;
  }

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

  public int getPriceValve() {
    return priceValve;
  }

  public void setPriceValve(int priceValve) {
    this.priceValve = priceValve;
  }

  public int getPriceStove() {
    return priceStove;
  }

  public void setPriceStove(int priceStove) {
    this.priceStove = priceStove;
  }

  public int getPriceTorch() {
    return priceTorch;
  }

  public void setPriceTorch(int priceTorch) {
    this.priceTorch = priceTorch;
  }

  public Promotion getPromotion() {
    return promotion;
  }

  public void setPromotion(Promotion promotion) {
    this.promotion = promotion;
  }

  public int getRegainTotal12() {
    return regainTotal12;
  }

  public void setRegainTotal12(int regainTotal12) {
    this.regainTotal12 = regainTotal12;
  }
}
