package com.vn.gasmanagement.service;

import com.vn.gasmanagement.payload.request.DatePartition;
import com.vn.gasmanagement.payload.request.InvoiceRequest;
import com.vn.gasmanagement.payload.response.BaseResponse;
import java.sql.SQLException;
import javax.servlet.http.HttpServletResponse;

public interface InvoiceService {

  BaseResponse createInvoice(InvoiceRequest request);

  void exportInvoice(String param, HttpServletResponse response);

  BaseResponse getListInvoiceCustomer(int customerId);

  BaseResponse getListInvoiceDate(DatePartition datePartition);

  BaseResponse getAllInvoice() throws SQLException;

  BaseResponse handleDataInOut() throws SQLException;
}
