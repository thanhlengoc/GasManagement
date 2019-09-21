package com.vn.gasmanagement.dto;

public class BalanceSheetDTO {

  private int key;
  private String date;
  private int totalSheetIn;
  private int totalSheetOut;
  private int totalShellIn;
  private int totalShellOut;
  private Long totalMoneyIn;
  private Long totalMoneyOut;
  private int income;
  private int moneyLost;

  public BalanceSheetDTO() {
  }

  public int getKey() { return key; }

  public void setKey(int key) { this.key = key; }

  public String getDate() { return date; }

  public void setDate(String date) { this.date = date; }

  public int getTotalSheetIn() {
    return totalSheetIn;
  }

  public void setTotalSheetIn(int totalSheetIn) {
    this.totalSheetIn = totalSheetIn;
  }

  public int getTotalSheetOut() {
    return totalSheetOut;
  }

  public void setTotalSheetOut(int totalSheetOut) {
    this.totalSheetOut = totalSheetOut;
  }

  public int getTotalShellIn() {
    return totalShellIn;
  }

  public void setTotalShellIn(int totalShellIn) {
    this.totalShellIn = totalShellIn;
  }

  public int getTotalShellOut() {
    return totalShellOut;
  }

  public void setTotalShellOut(int totalShellOut) {
    this.totalShellOut = totalShellOut;
  }

  public Long getTotalMoneyIn() {
    return totalMoneyIn;
  }

  public void setTotalMoneyIn(Long totalMoneyIn) {
    this.totalMoneyIn = totalMoneyIn;
  }


  public Long getTotalMoneyOut() {
    return totalMoneyOut;
  }

  public void setTotalMoneyOut(Long totalMoneyOut) {
    this.totalMoneyOut = totalMoneyOut;
  }


  public int getIncome() {
    return income;
  }

  public void setIncome(int income) {
    this.income = income;
  }

  public int getMoneyLost() {
    return moneyLost;
  }

  public void setMoneyLost(int moneyLost) {
    this.moneyLost = moneyLost;
  }
}
