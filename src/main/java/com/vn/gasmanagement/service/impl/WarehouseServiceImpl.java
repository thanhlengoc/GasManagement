package com.vn.gasmanagement.service.impl;

import com.vn.gasmanagement.modal.Bill;
import com.vn.gasmanagement.modal.BillDetail;
import com.vn.gasmanagement.modal.ImportCoupon;
import com.vn.gasmanagement.modal.ImportCouponDetail;
import com.vn.gasmanagement.modal.Promotion;
import com.vn.gasmanagement.payload.request.InWarehouseRequest;
import com.vn.gasmanagement.payload.response.BaseResponse;
import com.vn.gasmanagement.payload.response.ExistEndResponse;
import com.vn.gasmanagement.payload.response.InWarehouseResponse;
import com.vn.gasmanagement.payload.response.InvoiceResponse;
import com.vn.gasmanagement.repository.BillDetailRepository;
import com.vn.gasmanagement.repository.BillRepository;
import com.vn.gasmanagement.repository.GasRepository;
import com.vn.gasmanagement.repository.ImportCouponDetailRepository;
import com.vn.gasmanagement.repository.ImportCouponRepository;
import com.vn.gasmanagement.repository.PromotionRepository;
import com.vn.gasmanagement.service.WarehouseService;
import com.vn.gasmanagement.utils.DateTimeUtils;
import com.vn.gasmanagement.utils.StringUtils;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class WarehouseServiceImpl implements WarehouseService {

  private Logger logger = LoggerFactory.getLogger(WarehouseServiceImpl.class);

  @Autowired
  ImportCouponRepository importCouponRepository;

  @Autowired
  ImportCouponDetailRepository importCouponDetailRepository;

  @Autowired
  GasRepository gasRepository;

  @Autowired
  PromotionRepository promotionRepository;

  @Autowired
  BillRepository billRepository;

  @Autowired
  BillDetailRepository billDetailRepository;

  @Override
  public BaseResponse createNewBallot(InWarehouseRequest request) {
    try {
      ImportCoupon importCoupon = new ImportCoupon();
      importCoupon.setDateAdded(DateTimeUtils.convertDate(request.getDateIn(), DateTimeUtils.DATE_TIME_FORMAT));
      try {
        importCoupon.setDateAddedMilisec(DateTimeUtils
            .convertTimeStampMilisecond(request.getDateIn(), DateTimeUtils.DATE_FORMAT));
      }
      catch (Exception ex) {
        logger.error("importCoupon setDateAddedMilisec: " + ex);
      }
      importCoupon.setPersonAdded(request.getPersonIn());
      importCoupon.setOther(request.getOther());
      importCoupon.setNote(request.getNote());
      importCoupon.setPayment(request.getPayment());
      importCoupon.setValve(request.getValve());
      importCoupon.setStove(request.getStove());
      importCoupon.setTorch(request.getTorch());

      importCoupon.setPriceValveIn(request.getPriceValve());
      importCoupon.setPriceStoveIn(request.getPriceStove());
      importCoupon.setPriceTorchIn(request.getPriceTorch());

      if (request.getOil() + request.getSugar() + request.getGlass() != 0) {
        Promotion promotion = new Promotion();
        promotion.setOil(request.getOil());
        promotion.setSugar(request.getSugar());
        promotion.setGlass(request.getGlass());
        promotion.setPriceOil(request.getPriceOil());
        promotion.setPriceSugar(request.getPriceSugar());
        promotion.setPriceGlass(request.getPriceGlass());

        promotion.setTotalMoney(request.getPriceOil() + request.getPriceSugar()
            + request.getPriceGlass()
        );

        promotionRepository.save(promotion);
        importCoupon.setPromotion(promotion);
      }

      importCouponRepository.save(importCoupon);

      if(request.getElf6kg() != 0) {
        ImportCouponDetail elf6kg = new ImportCouponDetail();
        elf6kg.setIdGas(1);
        elf6kg.setIdImportCoupon(importCoupon.getId());
        elf6kg.setAmount(request.getElf6kg());
        elf6kg.setPayShellAmount(request.getPayShellElf6kg());
        elf6kg.setDebtShellAmount(request.getElf6kg() - request.getPayShellElf6kg());
        importCouponDetailRepository.save(elf6kg);
      }
      if(request.getElf12kg() != 0) {
        ImportCouponDetail elf12kg = new ImportCouponDetail();
        elf12kg.setIdImportCoupon(importCoupon.getId());
        elf12kg.setIdGas(2);
        elf12kg.setAmount(request.getElf12kg());
        elf12kg.setPayShellAmount(request.getPayShellElf12kg());
        elf12kg.setDebtShellAmount(request.getElf12kg() - request.getPayShellElf12kg());
        importCouponDetailRepository.save(elf12kg);
      }
      if(request.getElf39kg() != 0) {
        ImportCouponDetail elf39kg = new ImportCouponDetail();
        elf39kg.setIdImportCoupon(importCoupon.getId());
        elf39kg.setIdGas(3);
        elf39kg.setAmount(request.getElf39kg());
        elf39kg.setPayShellAmount(request.getPayShellElf39kg());
        elf39kg.setDebtShellAmount(request.getElf39kg() - request.getPayShellElf39kg());
        importCouponDetailRepository.save(elf39kg);
      }
      if(request.getB12() != 0) {
        ImportCouponDetail b12 = new ImportCouponDetail();
        b12.setIdImportCoupon(importCoupon.getId());
        b12.setIdGas(4);
        b12.setAmount(request.getB12());
        b12.setPayShellAmount(request.getPayShellB12());
        b12.setDebtShellAmount(request.getB12()-request.getPayShellB12());
        importCouponDetailRepository.save(b12);
      }
      if(request.getB45() != 0) {
        ImportCouponDetail b45 = new ImportCouponDetail();
        b45.setIdImportCoupon(importCoupon.getId());
        b45.setIdGas(5);
        b45.setAmount(request.getB45());
        b45.setPayShellAmount(request.getPayShellB45());
        b45.setDebtShellAmount(request.getB45() - request.getPayShellB45());
        importCouponDetailRepository.save(b45);
      }

      int totalShell = request.getPayShellB12() + request.getPayShellB45()
          + request.getPayShellElf6kg() + request.getPayShellElf12kg() + request.getPayShellElf39kg();
      importCoupon.setTotalShellPay(totalShell);

      importCoupon.setTotalAmount(request.getB12()+request.getB45()+request.getElf6kg()
          +request.getElf12kg()+request.getElf39kg());

      Integer gasRepoSize = gasRepository.findAll().size();
      int totalMoney = 0;
      if (gasRepoSize >= 5) {
        Integer unitPriceB12 = gasRepository.findById(4).get().getUnitPriceIn();
        Integer unitPriceB45 = gasRepository.findById(5).get().getUnitPriceIn();
        Integer unitPriceElf6 = gasRepository.findById(1).get().getUnitPriceIn();
        Integer unitPriceElf12 = gasRepository.findById(2).get().getUnitPriceIn();
        Integer unitPriceElf39 = gasRepository.findById(3).get().getUnitPriceIn();
        totalMoney = request.getB12()*unitPriceB12 +
            request.getB45()*unitPriceB45 +
            request.getElf6kg()*unitPriceElf6 +
            request.getElf12kg()*unitPriceElf12 +
            request.getElf39kg()*unitPriceElf39;
      }
      importCoupon.setTotalMoney(totalMoney);

      if (request.getPayment() != null) {
        importCoupon.setDebtMoney(totalMoney - request.getPayment());
      }
      // tính công nợ ngay trong đây. công nợ theo phiếu nhập.
      //công nợ vỏ = số vỏ nợ lần nhập trc + số vỏ nhập hiện tại - số vỏ trả hiện tại.
      //công nợ tiền.

      importCouponRepository.save(importCoupon);

      return new BaseResponse(1, "Lưu phiếu nhập thành công.", importCoupon);
    }
    catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse(0, "Lưu phiếu nhập thất bại.", null);
    }
  }

  @Override
  public BaseResponse tableInWarehouse(String dateFrom, String dateTo) {
    try {
      List<InWarehouseResponse> listData = new ArrayList<>();
      String beginDate = DateTimeUtils.date2Str(DateTimeUtils.str2Date(dateFrom, DateTimeUtils.DATE_FORMAT), DateTimeUtils.YYYYMMDDHHMMSS);
      String toDate = DateTimeUtils.date2Str(DateTimeUtils.str2Date(dateTo, DateTimeUtils.DATE_FORMAT), DateTimeUtils.YYYYMMDDHHMMSS);
      List<ImportCoupon> importCouponList = importCouponRepository.findAllByDatePartition(beginDate, toDate);

      for (ImportCoupon importCoupon : importCouponList) {
        InWarehouseResponse response = new InWarehouseResponse();
        response.setId(importCoupon.getId());
        response.setDateIn(importCoupon.getDateAdded().toString());
        response.setPersonIn(importCoupon.getPersonAdded());
        response.setTotalMoney(importCoupon.getTotalMoney());
        response.setPayment(importCoupon.getPayment());
        response.setNote(importCoupon.getNote());
        response.setDebtMoney(importCoupon.getDebtMoney());

        response.setValve(importCoupon.getValve());
        response.setStove(importCoupon.getStove());
        response.setTorch(importCoupon.getTorch());

        if (importCoupon.getPromotion() != null) {
          response.setOil(importCoupon.getPromotion().getOil());
          response.setSugar(importCoupon.getPromotion().getSugar());
          response.setGlass(importCoupon.getPromotion().getGlass());
        }

        List<ImportCouponDetail> importCouponDetailList =
            importCouponDetailRepository.findAllByIdImportCoupon(importCoupon.getId());
        if (!importCouponDetailList.isEmpty()) {
          for (ImportCouponDetail importCouponDetail : importCouponDetailList){
            int idGas = importCouponDetail.getIdGas();
            switch (idGas) {
              case 1:
                response.setElf6kg(importCouponDetail.getAmount());
                response.setPayShellElf6kg(importCouponDetail.getPayShellAmount());
                response.setDebtElf6kg(importCouponDetail.getDebtShellAmount());
                break;
              case 2:
                response.setElf12kg(importCouponDetail.getAmount());
                response.setPayShellElf12kg(importCouponDetail.getPayShellAmount());
                response.setDebtElf12kg(importCouponDetail.getDebtShellAmount());
                break;
              case 3:
                response.setElf39kg(importCouponDetail.getAmount());
                response.setPayShellElf39kg(importCouponDetail.getPayShellAmount());
                response.setDebtElf39kg(importCouponDetail.getDebtShellAmount());
                break;
              case 4:
                response.setB12(importCouponDetail.getAmount());
                response.setPayShellB12(importCouponDetail.getPayShellAmount());
                response.setDebtB12(importCouponDetail.getDebtShellAmount());
                break;
              case 5:
                response.setB45(importCouponDetail.getAmount());
                response.setPayShellB45(importCouponDetail.getPayShellAmount());
                response.setDebtB45(importCouponDetail.getDebtShellAmount());
                break;
              case 6:
                response.setTotal12(importCouponDetail.getAmount());
                response.setPayShellTotal12(importCouponDetail.getPayShellAmount());
                response.setDebtTotal12(importCouponDetail.getDebtShellAmount());
                break;
              default:
                response.setElf6kg(0);
                response.setElf12kg(0);
                response.setElf39kg(0);
                response.setB12(0);
                response.setB45(0);
                break;
            }
          }
        }

        //load công nợ đã tính theo từng hóa đơn theo ngày.

        listData.add(response);
      }

      return new BaseResponse<>(1, "Lấy thông tin nhập kho thành công.", listData);
    }
    catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse<>(0, "Lỗi khi lấy tất cả thông tin nhập kho.", null);
    }
  }

  @Override
  public BaseResponse tableOutWarehouse(String dateFrom, String dateTo) {
    try {
      List<InvoiceResponse> responseList = new ArrayList<>();
      String beginDate = DateTimeUtils.date2Str(DateTimeUtils.str2Date(dateFrom, DateTimeUtils.DATE_FORMAT), DateTimeUtils.YYYYMMDDHHMMSS);
      String toDate = DateTimeUtils.date2Str(DateTimeUtils.str2Date(dateTo, DateTimeUtils.DATE_FORMAT), DateTimeUtils.YYYYMMDDHHMMSS);
      List<Bill> billList = billRepository.findAllByPartition(beginDate, toDate);
      for (Bill bill : billList) {
        List<BillDetail> billDetailList = billDetailRepository.findAllByBillId(bill.getId());
        InvoiceResponse invoiceResponse = new InvoiceResponse();
        invoiceResponse.setInvoiceCode(bill.getId());
        invoiceResponse.setDateOut(bill.getInvoiceDate().toString());
        invoiceResponse.setUserSale(bill.getUserSale());
        invoiceResponse.setCustomerPurchase(bill.getCustomerPurchase());
        invoiceResponse.setNote(bill.getNote());

        invoiceResponse.setValve(bill.getValve());
        invoiceResponse.setStove(bill.getStove());
        invoiceResponse.setTorch(bill.getTorch());

        if (bill.getPromotion() != null) {
          invoiceResponse.setOil(bill.getPromotion().getOil());
          invoiceResponse.setSugar(bill.getPromotion().getSugar());
          invoiceResponse.setGlass(bill.getPromotion().getGlass());
        }

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
            case 6:
              invoiceResponse.setTotal12(billDetail.getAmount());
              break;
            default:
              break;
          }

        }

        responseList.add(invoiceResponse);
      }

      //trả về dto theo bảng.

      return new BaseResponse<>(1, "Lấy thông tin thành công.", responseList);
    }
    catch (Exception ex) {
      return new BaseResponse<>(0, "Lấy thông tin thất bại.", null);
    }
  }

  @Override
  public BaseResponse tableExistEnd(String dateFrom, String dateTo) {
    try {
      List<ExistEndResponse> existEndResponseList = new ArrayList<>();
      //tìm tất cả phiếu nhập trong partition.
      String beginDate = DateTimeUtils.date2Str(DateTimeUtils.str2Date(dateFrom, DateTimeUtils.DATE_FORMAT), DateTimeUtils.YYYYMMDDHHMMSS);
      String toDate = DateTimeUtils.date2Str(DateTimeUtils.str2Date(dateTo, DateTimeUtils.DATE_FORMAT), DateTimeUtils.YYYYMMDDHHMMSS);
      List<ImportCoupon> importCouponList = importCouponRepository.findAllByDatePartition(beginDate, toDate);

      int totalInput = 0;
      int totalInElf6 = 0;
      int totalInElf12 = 0;
      int totalInElf39 = 0;
      int totalInTotal12 = 0;
      int totalInB12 = 0;
      int totalInB45 = 0;

      int totalValve = 0;
      int totalStove = 0;
      int totalTorch = 0;

      int oilIn = 0;
      int sugarIn = 0;
      int glassIn = 0;
      for (ImportCoupon importCoupon : importCouponList) {
        totalInput += importCoupon.getTotalAmount();

        totalValve += importCoupon.getValve();
        totalStove += importCoupon.getStove();
        totalTorch += importCoupon.getTorch();

        if (importCoupon.getPromotion() != null) {
          Promotion promotionIn = importCoupon.getPromotion();
          oilIn += promotionIn.getOil();
          sugarIn += promotionIn.getSugar();
          glassIn += promotionIn.getGlass();
        }

        List<ImportCouponDetail> importCouponDetailList =
            importCouponDetailRepository.findAllByIdImportCoupon(importCoupon.getId());
        if (!importCouponDetailList.isEmpty()) {
          for (ImportCouponDetail importCouponDetail : importCouponDetailList){
            int idGas = importCouponDetail.getIdGas();
            switch (idGas) {
              case 1:
                totalInElf6 = importCouponDetail.getAmount();
                break;
              case 2:
                totalInElf12 = importCouponDetail.getAmount();
                break;
              case 3:
                totalInElf39 = importCouponDetail.getAmount();
                break;
              case 4:
                totalInB12 = importCouponDetail.getAmount();
                break;
              case 5:
                totalInB45 = importCouponDetail.getAmount();
                break;
              case 6:
                totalInTotal12 = importCouponDetail.getAmount();
                break;
              default:
                break;
            }
          }
        }
      }

      //tìm tất cả hóa đơn bán trong partition.
      List<Bill> billList = billRepository.findAllByPartition(beginDate, toDate);
      int totalOutput = 0;

      for (Bill bill : billList) {

        ExistEndResponse existEndResponse = new ExistEndResponse();
        existEndResponse.setKey(Integer.parseInt(bill.getId().toString()));
        existEndResponse.setDate(bill.getInvoiceDate().toString());

        if (bill.getPromotion() != null) {
          existEndResponse.setOil(oilIn - bill.getPromotion().getOil());
          existEndResponse.setSugar(sugarIn - bill.getPromotion().getSugar());
          existEndResponse.setGlass(glassIn - bill.getPromotion().getGlass());
        }

        existEndResponse.setValve(totalValve - bill.getValve());
        existEndResponse.setStove(totalStove - bill.getStove());
        existEndResponse.setTorch(totalTorch - bill.getTorch());

        totalOutput += bill.getTotalAmount();
        List<BillDetail> billDetailList = billDetailRepository.findAllByBillId(bill.getId());
        for (BillDetail billDetail : billDetailList) {
          int gasId = billDetail.getGasId();
          switch (gasId) {
            case 1:
              existEndResponse.setElf6(totalInElf6 - billDetail.getAmount());
              break;
            case 2:
              existEndResponse.setElf12(totalInElf12 - billDetail.getAmount());
              break;
            case 3:
              existEndResponse.setElf39(totalInElf39 - billDetail.getAmount());
              break;
            case 4:
              existEndResponse.setB12(totalInB12 - billDetail.getAmount());
              break;
            case 5:
              existEndResponse.setB45(totalInB45 - billDetail.getAmount());
              break;
            case 6:
              existEndResponse.setTotal12(totalInTotal12 - billDetail.getAmount());
              break;
            default:
              break;
          }
        }

        existEndResponseList.add(existEndResponse);
      }

      return new BaseResponse(1, "Lấy thông tin thành công.", existEndResponseList);
    }
    catch (Exception ex) {
      return new BaseResponse(0, "Lấy thông tin thất bại.", null);
    }
  }
}
