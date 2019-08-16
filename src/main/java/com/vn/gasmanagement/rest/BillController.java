package com.vn.gasmanagement.rest;

import com.vn.gasmanagement.dto.InvoiceDTO;
import com.vn.gasmanagement.payload.request.InvoiceRequest;
import com.vn.gasmanagement.service.impl.InvoiceServiceImpl;
import java.sql.SQLException;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/bill")
public class BillController {

  @Autowired
  InvoiceServiceImpl invoiceService;

  @GetMapping(value = "/export-invoice")
  public void exportInvoice(InvoiceDTO invoiceDTO, HttpServletResponse response) {
    invoiceService.exportInvoice(invoiceDTO, response);
  }

  @PostMapping(value = "/create-invoice")
  public ResponseEntity<?> createInvoice(@RequestBody InvoiceRequest request) {
    return new ResponseEntity<>(invoiceService.createInvoice(request), HttpStatus.OK);
  }

  @GetMapping(value = "/list-invoice")
  public ResponseEntity<?> getListInvoice(@RequestParam int customerId) {
    return new ResponseEntity<>(invoiceService.getListInvoiceCustomer(customerId), HttpStatus.OK);
  }

  @GetMapping(value = "/data-in-out")
  public ResponseEntity<?> getListInOut(@RequestParam String dateFrom, @RequestParam String dateTo)
      throws SQLException {
    return new ResponseEntity<>(invoiceService.handleDataInOut(dateFrom, dateTo), HttpStatus.OK);
  }
}
