package com.vn.gasmanagement.dto;

import com.vn.gasmanagement.modal.Bill;
import com.vn.gasmanagement.modal.BillDetail;
import java.util.List;

public class InvoiceDTO {

  private Bill bill;
  private List<BillDetail> billDetails;

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

}
