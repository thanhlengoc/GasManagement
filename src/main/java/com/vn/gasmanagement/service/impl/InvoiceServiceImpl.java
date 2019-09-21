package com.vn.gasmanagement.service.impl;

import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_B12;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_B45;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_DATEOUT;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_ELF12KG;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_ELF39KG;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_ELF6KG;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_OTHER;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_PAYMENT;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_PROMOTION_GLASS;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_PROMOTION_OIL;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_PROMOTION_SUGAR;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_REGAINSHELL_B12;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_REGAINSHELL_B45;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_REGAINSHELL_ELF12KG;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_REGAINSHELL_ELF39KG;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_REGAINSHELL_ELF6KG;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_TOTALMONEY;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_UNIT;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_UNITPRICE_B12;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_UNITPRICE_B45;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_UNITPRICE_ELF12KG;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_UNITPRICE_ELF39KG;
import static com.vn.gasmanagement.constant.ReportConstant.EX_OUTWAREHOUSE_UNITPRICE_ELF6KG;
import static com.vn.gasmanagement.constant.ReportConstant.INVOICE_TEMPLATE_FILE;
import static com.vn.gasmanagement.constant.ReportConstant.PDF_FILE_TYPE;

import com.vn.gasmanagement.dto.BalanceSheetDTO;
import com.vn.gasmanagement.dto.InvoiceDTO;
import com.vn.gasmanagement.dto.MoneyInOutDTO;
import com.vn.gasmanagement.modal.Bill;
import com.vn.gasmanagement.modal.BillDetail;
import com.vn.gasmanagement.modal.ImportCoupon;
import com.vn.gasmanagement.modal.Promotion;
import com.vn.gasmanagement.payload.request.DatePartition;
import com.vn.gasmanagement.payload.request.InvoiceRequest;
import com.vn.gasmanagement.payload.response.BaseResponse;
import com.vn.gasmanagement.payload.response.InvoiceResponse;
import com.vn.gasmanagement.reports.engine.ReportEngine;
import com.vn.gasmanagement.reports.engine.ReportEngineFactory;
import com.vn.gasmanagement.repository.BillDetailRepository;
import com.vn.gasmanagement.repository.BillRepository;
import com.vn.gasmanagement.repository.GasRepository;
import com.vn.gasmanagement.repository.ImportCouponDetailRepository;
import com.vn.gasmanagement.repository.ImportCouponRepository;
import com.vn.gasmanagement.repository.PromotionRepository;
import com.vn.gasmanagement.service.InvoiceService;
import com.vn.gasmanagement.utils.DateTimeUtils;
import com.vn.gasmanagement.utils.StringUtils;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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

  @Autowired
  ImportCouponRepository importCouponRepository;

  @Autowired
  ImportCouponDetailRepository importCouponDetailRepository;

  @Autowired
  PromotionRepository promotionRepository;

  @Override
  public BaseResponse createInvoice(InvoiceRequest request) {
    List<BillDetail> billDetails = new ArrayList<>();
    try {
      Bill bill = new Bill();
      bill.setInvoiceDate(
          DateTimeUtils.convertDate(request.getDateOut(), DateTimeUtils.DATE_TIME_FORMAT));
      bill.setCustomerPurchase(request.getCustomerPurchase());
      bill.setUserSale(request.getUserSale());
      bill.setDiscount(request.getDiscount());
      bill.setNote(request.getNote());

      bill.setOtherFeeContent(request.getOtherFeeContent());
      bill.setOtherFee(request.getOtherFee());

      bill.setValve(request.getValve());
      bill.setPriceValveOut(request.getPriceValve());
      bill.setStove(request.getStove());
      bill.setPriceStoveOut(request.getPriceStove());
      bill.setTorch(request.getTorch());
      bill.setPriceTorchOut(request.getPriceTorch());

      Promotion requestPromotion = request.getPromotion();
      Promotion promotion = new Promotion();
      promotion.setOil(requestPromotion.getOil());
      promotion.setSugar(requestPromotion.getSugar());
      promotion.setGlass(requestPromotion.getGlass());
      promotion.setPriceOil(requestPromotion.getPriceOil());
      promotion.setPriceSugar(requestPromotion.getPriceSugar());
      promotion.setPriceGlass(requestPromotion.getPriceGlass());
      promotionRepository.save(promotion);

      bill.setPromotion(promotion);

      billRepository.save(bill);

      int totalMoneyB12 = 0;
      int totalMoneyB45 = 0;
      int totalMoneyElf6 = 0;
      int totalMoneyElf12 = 0;
      int totalMoneyElf39 = 0;
      int totalTotal12 = 0;

      if (request.getB12() != 0) {
        BillDetail b12 = new BillDetail();
        b12.setAmount(request.getB12());
        b12.setGasId(4);
        b12.setBillId(bill.getId());
        totalMoneyB12 = StringUtils.formatStringToInt(request.getPriceB12());
        b12.setUnitPrice(totalMoneyB12);
        b12.setShellRegain(request.getRegainB12());
        billDetailRepository.save(b12);
        billDetails.add(b12);
      }
      if (request.getB45() != 0) {
        BillDetail b45 = new BillDetail();
        b45.setBillId(bill.getId());
        b45.setGasId(5);
        b45.setAmount(request.getB45());
        totalMoneyB45 = StringUtils.formatStringToInt(request.getPriceB45());
        b45.setUnitPrice(totalMoneyB45);
        b45.setShellRegain(request.getRegainB45());
        billDetailRepository.save(b45);
        billDetails.add(b45);
      }
      if (request.getElf6kg() != 0) {
        BillDetail elf6kg = new BillDetail();
        elf6kg.setGasId(1);
        elf6kg.setBillId(bill.getId());
        elf6kg.setAmount(request.getElf6kg());
        totalMoneyElf6 = StringUtils.formatStringToInt(request.getPriceElf6());
        elf6kg.setUnitPrice(totalMoneyElf6);
        elf6kg.setShellRegain(request.getRegainElf6kg());
        billDetailRepository.save(elf6kg);
        billDetails.add(elf6kg);
      }
      if (request.getElf12kg() != 0) {
        BillDetail elf12kg = new BillDetail();
        elf12kg.setGasId(2);
        elf12kg.setBillId(bill.getId());
        elf12kg.setAmount(request.getElf12kg());
        totalMoneyElf12 = StringUtils.formatStringToInt(request.getPriceElf12());
        elf12kg.setUnitPrice(totalMoneyElf12);
        elf12kg.setShellRegain(request.getRegainElf12kg());
        billDetailRepository.save(elf12kg);
        billDetails.add(elf12kg);
      }
      if (request.getElf39kg() != 0) {
        BillDetail elf39kg = new BillDetail();
        elf39kg.setGasId(3);
        elf39kg.setBillId(bill.getId());
        elf39kg.setAmount(request.getElf39kg());
        totalMoneyElf39 = StringUtils.formatStringToInt(request.getPriceElf39());
        elf39kg.setUnitPrice(totalMoneyElf39);
        elf39kg.setShellRegain(request.getRegainElf39kg());
        billDetailRepository.save(elf39kg);
        billDetails.add(elf39kg);
      }
      if (request.getTotal12() != 0) {
        BillDetail total12 = new BillDetail();
        total12.setGasId(6);
        total12.setBillId(bill.getId());
        total12.setAmount(request.getTotal12());
        totalTotal12 = StringUtils.formatStringToInt(request.getPriceTotal12());
        total12.setUnitPrice(totalTotal12);
        billDetailRepository.save(total12);
        billDetails.add(total12);
      }

      int totalAmount = request.getB12() + request.getB45() + request.getElf6kg()
          + request.getElf12kg() + request.getElf39kg();
      bill.setTotalAmount(totalAmount);

      Integer totalMoney = request.getB12() * totalMoneyB12
          + request.getB45() * totalMoneyB45
          + request.getElf6kg() * totalMoneyElf6
          + request.getElf12kg() * totalMoneyElf12
          + request.getElf39kg() * totalMoneyElf39
          + request.getTotal12() * totalTotal12;
      bill.setTotalMoney(totalMoney);

      Integer totalShellRegain = request.getRegainB12()
          + request.getRegainB45()
          + request.getRegainElf6kg()
          + request.getRegainElf12kg()
          + request.getRegainElf39kg()
          + request.getRegainTotal12();
      bill.setTotalShellRegain(totalShellRegain);

      billRepository.save(bill);

      //tính khách hàng trả vỏ, nợ vỏ tại đây, nợ tiền.
      //số vỏ nợ = số bình của hóa đơn trước đó - số vỏ khách hàng trả của hóa đơn hiện tại.
      //lưu debt của khách hàng xuống db

      return new BaseResponse<>(1, "Tạo hóa đơn thành công.", bill.getId());
    } catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse<>(0, "Tạo hóa đơn thất bại.", null);
    }
  }

  @Override
  public void exportInvoice(Long billId, HttpServletResponse response) {
    try {
      final ReportEngine report = ReportEngineFactory.createInstance(PDF_FILE_TYPE);
      if (report == null) {
        return;
      }
      final List<Map<String, String>> list = new ArrayList<>();
      final Map<String, Object> parameters = new HashMap<>();
      final DecimalFormat nf = new DecimalFormat("#,###,###,##0");
      Map<String, String> row = new HashMap<>();
      Optional<Bill> bill = billRepository.findById(billId);
      if (bill.isPresent()) {
        row.put(EX_OUTWAREHOUSE_DATEOUT, bill.get().getInvoiceDate().toString());
        row.put(EX_OUTWAREHOUSE_ELF6KG, "");
        row.put(EX_OUTWAREHOUSE_ELF12KG, "");
        row.put(EX_OUTWAREHOUSE_ELF39KG, "");
        row.put(EX_OUTWAREHOUSE_B12, "");
        row.put(EX_OUTWAREHOUSE_B45, "");
        row.put(EX_OUTWAREHOUSE_OTHER, "");
        row.put(EX_OUTWAREHOUSE_UNIT, "");
        row.put(EX_OUTWAREHOUSE_UNITPRICE_ELF6KG, "");
        row.put(EX_OUTWAREHOUSE_UNITPRICE_ELF12KG, "");
        row.put(EX_OUTWAREHOUSE_UNITPRICE_ELF39KG, "");
        row.put(EX_OUTWAREHOUSE_UNITPRICE_B12, "");
        row.put(EX_OUTWAREHOUSE_UNITPRICE_B45, "");
        row.put(EX_OUTWAREHOUSE_REGAINSHELL_ELF6KG, "");
        row.put(EX_OUTWAREHOUSE_REGAINSHELL_ELF12KG, "");
        row.put(EX_OUTWAREHOUSE_REGAINSHELL_ELF39KG, "");
        row.put(EX_OUTWAREHOUSE_REGAINSHELL_B12, "");
        row.put(EX_OUTWAREHOUSE_REGAINSHELL_B45, "");
        row.put(EX_OUTWAREHOUSE_PROMOTION_OIL, "");
        row.put(EX_OUTWAREHOUSE_PROMOTION_SUGAR, "");
        row.put(EX_OUTWAREHOUSE_PROMOTION_GLASS, "");
        row.put(EX_OUTWAREHOUSE_TOTALMONEY, "");
        row.put(EX_OUTWAREHOUSE_PAYMENT, "");

        list.add(row);
      }

      report.render(INVOICE_TEMPLATE_FILE, parameters, list, response);
    } catch (Exception ex) {
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
        response.setDateOut(bill.getInvoiceDate().toString());
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
              case 6:
                response.setTotal12(billDetail.getAmount());
                break;
              default:
                break;
            }
          }
        }

        invoiceResponseList.add(response);
      }

      return new BaseResponse<>(1,
          "Lấy danh sách hóa đơn của khách hàng thành công.", invoiceResponseList);
    } catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse<>(0, "Lấy danh sách hóa đơn của khách hàng thất bại.", null);
    }
  }

  @Override
  public BaseResponse getListInvoiceDate(DatePartition datePartition) {
    try {

      return new BaseResponse<>(1, "Lấy danh sách hóa đơn thành công.", null);
    } catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse<>(0, "Lấy danh sách hóa đơn thất bại.", null);
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
        invoiceResponse.setDateOut(bill.getInvoiceDate().toString());
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
      return new BaseResponse<>(1, "Lấy tất cả hóa đơn thành công.", responseList);
    } catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse<>(0, "Lấy tất cả hóa đơn thất bại.", null);
    }
  }

  @Override
  public BaseResponse handleDataInOut(String dateFrom, String dateTo) throws SQLException {
    try {
      List<BalanceSheetDTO> balanceSheetDTOList = new ArrayList<>();
      String beginDate = DateTimeUtils
          .date2Str(DateTimeUtils.str2Date(dateFrom, DateTimeUtils.DATE_FORMAT),
              DateTimeUtils.YYYYMMDDHHMMSS);
      String toDate = DateTimeUtils
          .date2Str(DateTimeUtils.str2Date(dateTo, DateTimeUtils.DATE_FORMAT),
              DateTimeUtils.YYYYMMDDHHMMSS);
      List<Bill> billList = billRepository.findAllByPartition(beginDate, toDate);
//      List<ImportCoupon> importCouponList = importCouponRepository
//          .findAllByDatePartition(beginDate, toDate);

      Long totalMoneyBill = 0L;
      Integer totalShellOut = 0;
      for (Bill bill : billList) {
        BalanceSheetDTO balanceSheetDTO = new BalanceSheetDTO();

        String dateInvoice = DateTimeUtils.date2Str(DateTimeUtils
                .str2Date(bill.getInvoiceDate().toString(), DateTimeUtils.YYYYMMDDHHMMSSSSS),
            DateTimeUtils.YYYYMMDDHHMMSS);

        ImportCoupon importCoupon = importCouponRepository
            .findByDateAdded(DateTimeUtils.convertTimeStampMilisecond(
                bill.getInvoiceDate().toString(), DateTimeUtils.YYYYMMDDHHMMSSSSS));
//        Long totalMoneyImport = 0L;
//        Integer totalShellIn = 0;
        if (importCoupon.getTotalMoney() != null) {
          balanceSheetDTO.setTotalMoneyOut(Long.valueOf(importCoupon.getTotalMoney()));
        }
        balanceSheetDTO.setTotalShellIn(importCoupon.getTotalAmount());
//        balanceSheetDTO.setTotalSheetIn(importCouponList.size());

        if (bill.getTotalMoney() != null) {
//          totalMoneyBill += bill.getTotalMoney();
          balanceSheetDTO.setTotalMoneyIn(Long.valueOf(bill.getTotalMoney()));
        }
        balanceSheetDTO.setKey(Integer.parseInt(bill.getId().toString()));
        balanceSheetDTO.setDate(bill.getInvoiceDate().toString());

        List<Bill> billTo = billRepository.findAllByPartition(beginDate, dateInvoice);
        balanceSheetDTO.setTotalSheetOut(billTo.size());

        totalShellOut += bill.getTotalAmount();
        balanceSheetDTO.setTotalShellOut(totalShellOut);


        if (bill.getTotalMoney() > importCoupon.getTotalMoney()) {
          balanceSheetDTO.setIncome(bill.getTotalMoney() - importCoupon.getTotalMoney());
          balanceSheetDTO.setMoneyLost(0);
        } else {
          balanceSheetDTO.setIncome(0);
          balanceSheetDTO.setMoneyLost(importCoupon.getTotalMoney() - bill.getTotalMoney());
        }

        balanceSheetDTOList.add(balanceSheetDTO);
      }

      MoneyInOutDTO moneyInOutDTO = new MoneyInOutDTO();
      moneyInOutDTO.setBalanceSheetDTOList(balanceSheetDTOList);
//      moneyInOutDTO.setIncomings();

      return new BaseResponse<>(1, "Lấy thông tin thu chi thành công từ server.",
          balanceSheetDTOList);
    } catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse<>(0, "Lấy thông tin thu chi thất bại từ server.", null);
    }
  }
}
