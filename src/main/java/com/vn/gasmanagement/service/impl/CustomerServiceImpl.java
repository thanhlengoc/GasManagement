package com.vn.gasmanagement.service.impl;

import com.vn.gasmanagement.modal.Customer;
import com.vn.gasmanagement.payload.request.NewCustomerRequest;
import com.vn.gasmanagement.payload.request.UpdateCustomerRequest;
import com.vn.gasmanagement.payload.response.BaseResponse;
import com.vn.gasmanagement.repository.CustomerRepository;
import com.vn.gasmanagement.service.CustomerService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

  private Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);

  @Autowired
  CustomerRepository customerRepository;

  @Override
  public BaseResponse getAllCustomer() {
    try {
      List<Customer> listCustomer = customerRepository.findAll();
      return new BaseResponse(1, "get all customer success.", listCustomer);
    }
    catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse(0, "get all customer fail.", null);
    }
  }

  @Override
  public BaseResponse createNewCustomer(NewCustomerRequest request) {
    try {
      Customer customer = new Customer();
      customer.setCustomerName(request.getCusName());
      customer.setCustomerType(request.getCusType());
      customer.setCustomerPhone(request.getCusPhone());
      customer.setCustomerAddress(request.getCusAddress());
      customer.setStartDateBuy(request.getStartBuy());
      customer.setLastPurchaseDate(request.getLastBuy());
      customer.setNote(request.getNote());
      customerRepository.save(customer);
      return new BaseResponse(1, "create customer success", customer);
    }
    catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse(0, "create customer fail.", null);
    }
  }

  @Override
  public BaseResponse updateCustomer(UpdateCustomerRequest request) {
    try {
      Optional<Customer> optionalCustomer = customerRepository.findById(Long.valueOf(request.getCusId()));
      if (optionalCustomer.isPresent()) {
        Customer customer = optionalCustomer.get();
        customer.setCustomerType(request.getCusType());
        customer.setCustomerName(request.getCusName());
        customer.setCustomerPhone(request.getCusPhone());
        customer.setCustomerAddress(request.getCusAddress());
        customer.setLastPurchaseDate(request.getLastBuy());
        customer.setNote(request.getNote());
        customerRepository.save(customer);

        return new BaseResponse(1, "Cập nhật thông tin khách hàng thành công.", customer);
      }
      else {
        return new BaseResponse(0, "Không tìm thấy khách hàng này.", null);
      }
    }
    catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse(0, "Cập nhật thông tin khách hàng thất bại.", null);
    }
  }
}
