package com.vn.gasmanagement.service.impl;

import static com.vn.gasmanagement.constant.ReportConstant.INVOICE_TEMPLATE_FILE;
import static com.vn.gasmanagement.constant.ReportConstant.PDF_FILE_TYPE;

import com.vn.gasmanagement.modal.Bill;
import com.vn.gasmanagement.modal.BillDetail;
import com.vn.gasmanagement.payload.request.DatePartition;
import com.vn.gasmanagement.payload.request.InvoiceRequest;
import com.vn.gasmanagement.payload.response.BaseResponse;
import com.vn.gasmanagement.payload.response.InvoiceResponse;
import com.vn.gasmanagement.reports.engine.ReportEngine;
import com.vn.gasmanagement.reports.engine.ReportEngineFactory;
import com.vn.gasmanagement.repository.BillDetailRepository;
import com.vn.gasmanagement.repository.BillRepository;
import com.vn.gasmanagement.repository.GasRepository;
import com.vn.gasmanagement.service.InvoiceService;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvoiceServiceImpl implements InvoiceService {

  private Logger logger = LoggerFactory.getLogger(InvoiceServiceImpl.class);

  @Autowired
  BillRepository billRepository;

  @Autowired
  BillDetailRepository billDetailRepository;

  @Autowired
  GasRepository gasRepository;

  @Override
  public BaseResponse createInvoice(InvoiceRequest request) {
    try {
      Bill bill = new Bill();
      bill.setInvoiceDate(request.getDateOut());
      bill.setCustomerPurchase(request.getCustomerPurchase());
      bill.setUserSale(request.getUserSale());
      bill.setDiscount(request.getDiscount());
      bill.setNote(request.getNote());
      billRepository.save(bill);

      if(request.getB12() != 0) {
        BillDetail b12 = new BillDetail();
        b12.setAmount(request.getB12());
        b12.setGasId(4);
        b12.setBillId(bill.getId());
        billDetailRepository.save(b12);
      }
      if (request.getB45() != 0) {
        BillDetail b45 = new BillDetail();
        b45.setBillId(bill.getId());
        b45.setGasId(5);
        b45.setAmount(request.getB45());
        billDetailRepository.save(b45);
      }
      if (request.getElf6kg() != 0) {
        BillDetail elf6kg = new BillDetail();
        elf6kg.setGasId(1);
        elf6kg.setBillId(bill.getId());
        elf6kg.setAmount(request.getElf6kg());
        billDetailRepository.save(elf6kg);
      }
      if (request.getElf12kg() != 0) {
        BillDetail elf12kg = new BillDetail();
        elf12kg.setGasId(2);
        elf12kg.setBillId(bill.getId());
        elf12kg.setAmount(request.getElf12kg());
        billDetailRepository.save(elf12kg);
      }
      if (request.getElf39kg() != 0) {
        BillDetail elf39kg = new BillDetail();
        elf39kg.setGasId(3);
        elf39kg.setBillId(bill.getId());
        elf39kg.setAmount(request.getElf39kg());
        billDetailRepository.save(elf39kg);
      }

      int totalAmount = request.getB12() + request.getB45() + request.getElf6kg()
                        + request.getElf12kg() + request.getElf39kg();
      bill.setTotalAmount(totalAmount);
      Long unitPriceB12 = gasRepository.findById(4).get().getUnitPriceOut();
      Long unitPriceB45 = gasRepository.findById(5).get().getUnitPriceOut();
      Long unitPriceElf6 = gasRepository.findById(1).get().getUnitPriceOut();
      Long unitPriceElf12 = gasRepository.findById(2).get().getUnitPriceOut();
      Long unitPriceElf39 = gasRepository.findById(3).get().getUnitPriceOut();
      Long totalMoney = request.getB12()*unitPriceB12
                        + request.getB45()*unitPriceB45
                        + request.getElf6kg()*unitPriceElf6
                        + request.getElf12kg()*unitPriceElf12
                        + request.getElf39kg()*unitPriceElf39;
      bill.setTotalMoney(totalMoney);
      billRepository.save(bill);

      return new BaseResponse(1, "Tạo hóa đơn thành công.", bill);
    }
    catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse(0, "Tạo hóa đơn thất bại.", null);
    }
  }

  @Override
  public void exportInvoice(String param, HttpServletResponse response) {
    try {
      final ReportEngine report = ReportEngineFactory.createInstance(PDF_FILE_TYPE);
      if (report == null){
        return;
      }
      final List<Map<String, String>> list = new ArrayList<>();
      final Map<String, Object> parameters = new HashMap<>();
      report.render(INVOICE_TEMPLATE_FILE, parameters, list, response);
    }
    catch (Exception ex) {
      logger.error(ex.getMessage());
    }
  }

  @Override
  public BaseResponse getListInvoiceCustomer(int customerId) {
    try {
      List<InvoiceResponse> invoiceResponseList = new ArrayList<>();
      List<Bill> billList = billRepository.findAllByCustomerPurchase(customerId);
      for (Bill bill : billList) {
        InvoiceResponse response = new InvoiceResponse();
        response.setInvoiceCode(bill.getId());
        response.setDateOut(bill.getInvoiceDate());
        response.setCustomerPurchase(bill.getCustomerPurchase());
        response.setUserSale(bill.getUserSale());
        response.setNote(bill.getNote());

        List<BillDetail> billDetailList = billDetailRepository.findAllByBillId(bill.getId());
        if (!billDetailList.isEmpty()) {
          for (BillDetail billDetail : billDetailList) {
            int gasId = billDetail.getGasId();
            switch (gasId) {
              case 1:
                response.setElf6kg(billDetail.getAmount());
                break;
              case 2:
                response.setElf12kg(billDetail.getAmount());
                break;
              case 3:
                response.setElf39kg(billDetail.getAmount());
                break;
              case 4:
                response.setB12(billDetail.getAmount());
                break;
              case 5:
                response.setB45(billDetail.getAmount());
                default:
                  break;
            }
          }
        }

        invoiceResponseList.add(response);
      }

      return new BaseResponse(0,
          "Lấy danh sách hóa đơn của khách hàng thành công.", invoiceResponseList);
    }
    catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse(0, "Lấy danh sách hóa đơn của khách hàng thất bại.", null);
    }
  }

  @Override
  public BaseResponse getListInvoiceDate(DatePartition datePartition) {
    try {

      return new BaseResponse(1, "Lấy danh sách hóa đơn thành công.", null);
    }
    catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse(0, "Lấy danh sách hóa đơn thất bại.", null);
    }
  }

  @Override
  public BaseResponse getAllInvoice() throws SQLException {
    try {
      List<InvoiceResponse> responseList = new ArrayList<>();
      List<Bill> billList = billRepository.findAll();
      for (Bill bill : billList) {
        List<BillDetail> billDetailList = billDetailRepository.findAllByBillId(bill.getId());
        InvoiceResponse invoiceResponse = new InvoiceResponse();
        invoiceResponse.setInvoiceCode(bill.getId());
        invoiceResponse.setDateOut(bill.getInvoiceDate());
        invoiceResponse.setUserSale(bill.getUserSale());
        invoiceResponse.setCustomerPurchase(bill.getCustomerPurchase());
        invoiceResponse.setNote(bill.getNote());
        for (BillDetail billDetail : billDetailList) {
          int gasId = billDetail.getGasId();
          switch (gasId) {
            case 1:
              invoiceResponse.setElf6kg(billDetail.getAmount());
              break;
            case 2:
              invoiceResponse.setElf12kg(billDetail.getAmount());
              break;
            case 3:
              invoiceResponse.setElf39kg(billDetail.getAmount());
              break;
            case 4:
              invoiceResponse.setB12(billDetail.getAmount());
              break;
            case 5:
              invoiceResponse.setB45(billDetail.getAmount());
              break;
              default:
                break;
          }

        }

        responseList.add(invoiceResponse);
      }
      return new BaseResponse(1,"Lấy tất cả hóa đơn thành công.", responseList);
    }
    catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse(0,"Lấy tất cả hóa đơn thất bại.", null);
    }
  }

  @Override
  public BaseResponse handleDataInOut() throws SQLException {
    try {

      return new BaseResponse(0,"Lấy thông tin thu chi thành công từ server.", null);
    }
    catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse(0,"Lấy thông tin thu chi thất bại từ server.", null);
    }
  }
}
