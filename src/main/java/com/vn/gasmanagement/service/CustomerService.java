package com.vn.gasmanagement.service;

import com.vn.gasmanagement.payload.request.NewCustomerRequest;
import com.vn.gasmanagement.payload.response.BaseResponse;

public interface CustomerService {

  BaseResponse getAllCustomer();

  BaseResponse createNewCustomer(NewCustomerRequest request);
}
