package com.vn.gasmanagement.dto;

import java.util.List;

public class MoneyInOutDTO {
  private int incomings;
  private int outgoings;
  private int totalMoneyIncom;
  private int totalMoneyLose;
  private List<BalanceSheetDTO> balanceSheetDTOList;

  public int getIncomings() {
    return incomings;
  }

  public void setIncomings(int incomings) {
    this.incomings = incomings;
  }

  public int getOutgoings() {
    return outgoings;
  }

  public void setOutgoings(int outgoings) {
    this.outgoings = outgoings;
  }

  public List<BalanceSheetDTO> getBalanceSheetDTOList() {
    return balanceSheetDTOList;
  }

  public void setBalanceSheetDTOList(
      List<BalanceSheetDTO> balanceSheetDTOList) {
    this.balanceSheetDTOList = balanceSheetDTOList;
  }

  public int getTotalMoneyIncom() {
    return totalMoneyIncom;
  }

  public void setTotalMoneyIncom(int totalMoneyIncom) {
    this.totalMoneyIncom = totalMoneyIncom;
  }

  public int getTotalMoneyLose() {
    return totalMoneyLose;
  }

  public void setTotalMoneyLose(int totalMoneyLose) {
    this.totalMoneyLose = totalMoneyLose;
  }
}
