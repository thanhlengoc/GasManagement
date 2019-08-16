package com.vn.gasmanagement.dto;

import com.vn.gasmanagement.modal.Bill;
import com.vn.gasmanagement.modal.BillDetail;
import com.vn.gasmanagement.modal.PayShell;
import com.vn.gasmanagement.modal.PayShellDetail;
import com.vn.gasmanagement.modal.RegainShell;
import com.vn.gasmanagement.modal.RegainShellDetail;
import java.util.List;

public class InvoiceDTO {

  private Bill bill;
  private List<BillDetail> billDetails;
  private RegainShell regainShell;
  private List<RegainShellDetail> regainShellDetails;

  public Bill getBill() {
    return bill;
  }

  public void setBill(Bill bill) {
    this.bill = bill;
  }

  public List<BillDetail> getBillDetails() {
    return billDetails;
  }

  public void setBillDetails(List<BillDetail> billDetails) {
    this.billDetails = billDetails;
  }

  public RegainShell getRegainShell() {
    return regainShell;
  }

  public void setRegainShell(RegainShell regainShell) {
    this.regainShell = regainShell;
  }

  public List<RegainShellDetail> getRegainShellDetails() {
    return regainShellDetails;
  }

  public void setRegainShellDetails(
      List<RegainShellDetail> regainShellDetails) {
    this.regainShellDetails = regainShellDetails;
  }
}
