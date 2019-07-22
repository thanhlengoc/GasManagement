package com.vn.gasmanagement.rest;

import com.vn.gasmanagement.payload.request.InvoiceRequest;
import com.vn.gasmanagement.service.impl.InvoiceServiceImpl;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/bill")
public class BillController {

  @Autowired
  InvoiceServiceImpl invoiceService;

  @GetMapping(value = "/export-invoice")
  public void exportInvoice(String param, HttpServletResponse response) {
    invoiceService.exportInvoice(param, response);
  }

  @PostMapping(value = "/create-invoice")
  public ResponseEntity<?> createInvoice(InvoiceRequest request) {
    return new ResponseEntity<>(invoiceService.createInvoice(request), HttpStatus.OK);
  }

  @GetMapping(value = "/list-invoice")
  public ResponseEntity<?> getListInvoice(@RequestParam int customerId) {
    return new ResponseEntity<>(invoiceService.getListInvoiceCustomer(customerId), HttpStatus.OK);
  }
}
