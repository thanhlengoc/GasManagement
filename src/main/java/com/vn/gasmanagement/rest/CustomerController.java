package com.vn.gasmanagement.rest;

import com.vn.gasmanagement.payload.request.NewCustomerRequest;
import com.vn.gasmanagement.payload.request.UpdateCustomerRequest;
import com.vn.gasmanagement.service.impl.CustomerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

  @Autowired
  CustomerServiceImpl customerService;

  @GetMapping(value = "/get-all")
  public ResponseEntity<?> getAllCustomer() {
    return new ResponseEntity<>(customerService.getAllCustomer(), HttpStatus.OK);
  }

  @PostMapping(value = "/create-new")
  public ResponseEntity<?> createNewCustomer(@RequestBody NewCustomerRequest request) {
    return new ResponseEntity<>(customerService.createNewCustomer(request), HttpStatus.OK);
  }

  @PostMapping(value = "/update-info")
  public ResponseEntity<?> updateCustomer(@RequestBody UpdateCustomerRequest request) {
    return new ResponseEntity<>(customerService.updateCustomer(request), HttpStatus.OK);
  }
}
