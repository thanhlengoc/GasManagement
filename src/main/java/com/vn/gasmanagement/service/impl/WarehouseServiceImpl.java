package com.vn.gasmanagement.service.impl;

import com.vn.gasmanagement.modal.Debt;
import com.vn.gasmanagement.modal.DebtDetail;
import com.vn.gasmanagement.modal.ImportCoupon;
import com.vn.gasmanagement.modal.ImportCouponDetail;
import com.vn.gasmanagement.modal.PayShell;
import com.vn.gasmanagement.modal.PayShellDetail;
import com.vn.gasmanagement.modal.Promotion;
import com.vn.gasmanagement.payload.request.InWarehouseRequest;
import com.vn.gasmanagement.payload.response.BaseResponse;
import com.vn.gasmanagement.payload.response.InWarehouseResponse;
import com.vn.gasmanagement.repository.DebtDetailRepository;
import com.vn.gasmanagement.repository.DebtRepository;
import com.vn.gasmanagement.repository.GasRepository;
import com.vn.gasmanagement.repository.ImportCouponDetailRepository;
import com.vn.gasmanagement.repository.ImportCouponRepository;
import com.vn.gasmanagement.repository.PayShellDetailRepository;
import com.vn.gasmanagement.repository.PayShellRepository;
import com.vn.gasmanagement.repository.PromotionRepository;
import com.vn.gasmanagement.service.WarehouseService;
import java.sql.Date;
import java.util.ArrayList;
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
  PayShellRepository payShellRepository;

  @Autowired
  PayShellDetailRepository payShellDetailRepository;

  @Autowired
  GasRepository gasRepository;

  @Autowired
  PromotionRepository promotionRepository;

  @Autowired
  DebtRepository debtRepository;

  @Autowired
  DebtDetailRepository debtDetailRepository;

  @Override
  public BaseResponse inWarehouse(InWarehouseRequest request) {
    try {
      ImportCoupon importCoupon = new ImportCoupon();
      importCoupon.setDateAdded(Date.valueOf(request.getDateIn()));
      importCoupon.setPersonAdded(request.getPersonIn());
      importCoupon.setOther(request.getOther());
      importCoupon.setNote(request.getNote());
      importCoupon.setPayment(request.getPayment());
      importCouponRepository.save(importCoupon);

      if(request.getElf6kg() != 0) {
        ImportCouponDetail elf6kg = new ImportCouponDetail();
        elf6kg.setIdGas(1);
        elf6kg.setIdImportCoupon(importCoupon.getId());
        elf6kg.setAmount(request.getElf6kg());
        importCouponDetailRepository.save(elf6kg);
      }
      if(request.getElf12kg() != 0) {
        ImportCouponDetail elf12kg = new ImportCouponDetail();
        elf12kg.setIdImportCoupon(importCoupon.getId());
        elf12kg.setIdGas(2);
        elf12kg.setAmount(request.getElf12kg());
        importCouponDetailRepository.save(elf12kg);
      }
      if(request.getElf39kg() != 0) {
        ImportCouponDetail elf39kg = new ImportCouponDetail();
        elf39kg.setIdImportCoupon(importCoupon.getId());
        elf39kg.setIdGas(3);
        elf39kg.setAmount(request.getElf39kg());
        importCouponDetailRepository.save(elf39kg);
      }
      if(request.getB12() != 0) {
        ImportCouponDetail b12 = new ImportCouponDetail();
        b12.setIdImportCoupon(importCoupon.getId());
        b12.setIdGas(4);
        b12.setAmount(request.getB12());
        importCouponDetailRepository.save(b12);
      }
      if(request.getB45() != 0) {
        ImportCouponDetail b45 = new ImportCouponDetail();
        b45.setIdImportCoupon(importCoupon.getId());
        b45.setIdGas(5);
        b45.setAmount(request.getB45());
        importCouponDetailRepository.save(b45);
      }

      int totalShell = request.getPayShellB12() + request.getPayShellB45()
          + request.getPayShellElf6kg() + request.getPayShellElf12kg() + request.getPayShellElf39kg();
      if (totalShell != 0) {
        PayShell payShell = new PayShell();
        payShell.setDatePay(request.getDateIn());
        payShell.setTotalShell(totalShell);
        payShellRepository.save(payShell);

        importCoupon.setIdPayShell(payShell.getId());

        if (request.getPayShellElf6kg() != 0) {
          PayShellDetail elf6kg = new PayShellDetail();
          elf6kg.setIdPayShell(payShell.getId());
          elf6kg.setIdGas(1);
          elf6kg.setAmount(request.getPayShellElf6kg());
          payShellDetailRepository.save(elf6kg);
        }
        if (request.getPayShellElf12kg() !=0) {
          PayShellDetail elf12kg = new PayShellDetail();
          elf12kg.setIdPayShell(payShell.getId());
          elf12kg.setIdGas(2);
          elf12kg.setAmount(request.getPayShellElf12kg());
          payShellDetailRepository.save(elf12kg);
        }
        if(request.getPayShellElf39kg() != 0) {
          PayShellDetail elf39kg = new PayShellDetail();
          elf39kg.setIdPayShell(payShell.getId());
          elf39kg.setIdGas(3);
          elf39kg.setAmount(request.getPayShellElf39kg());
          payShellDetailRepository.save(elf39kg);
        }
        if(request.getPayShellB12() != 0) {
          PayShellDetail b12 = new PayShellDetail();
          b12.setIdPayShell(payShell.getId());
          b12.setIdGas(4);
          b12.setAmount(request.getPayShellB12());
          payShellDetailRepository.save(b12);
        }
        if(request.getPayShellB45() != 0) {
          PayShellDetail b45 = new PayShellDetail();
          b45.setIdPayShell(payShell.getId());
          b45.setIdGas(5);
          b45.setAmount(request.getPayShellB45());
          payShellDetailRepository.save(b45);
        }
      }

      if (request.getOil() + request.getSugar() + request.getGlass() != 0) {
        Promotion promotion = new Promotion();
        promotion.setDateIn(request.getDateIn());
        promotion.setOil(request.getOil());
        promotion.setSugar(request.getSugar());
        promotion.setGlass(request.getGlass());
        promotionRepository.save(promotion);
      }

      importCoupon.setTotalAmount(request.getB12()+request.getB45()+request.getElf6kg()
          +request.getElf12kg()+request.getElf39kg());

      Long unitPriceB12 = gasRepository.findById(4).get().getUnitPriceIn();
      Long unitPriceB45 = gasRepository.findById(5).get().getUnitPriceIn();
      Long unitPriceElf6 = gasRepository.findById(1).get().getUnitPriceIn();
      Long unitPriceElf12 = gasRepository.findById(2).get().getUnitPriceIn();
      Long unitPriceElf39 = gasRepository.findById(3).get().getUnitPriceIn();
      importCoupon.setTotalMoney(
          request.getB12()*unitPriceB12 +
          request.getB45()*unitPriceB45 +
          request.getElf6kg()*unitPriceElf6 +
          request.getElf12kg()*unitPriceElf12 +
          request.getElf39kg()*unitPriceElf39
      );

      Debt debt = new Debt();
      debt.setDate(request.getDateIn());
      debt.setDebtMoney(importCoupon.getTotalMoney() - importCoupon.getPayment());
      debtRepository.save(debt);

      importCoupon.setIdDebt(debt.getId());
      importCouponRepository.save(importCoupon);

      if(request.getDebtElf6kg() != 0) {
        DebtDetail elf6 = new DebtDetail();
        elf6.setDebtId(debt.getId());
        elf6.setGasId(1);
        elf6.setAmount(request.getDebtElf6kg());
        debtDetailRepository.save(elf6);
      }
      if(request.getDebtElf12kg() != 0) {
        DebtDetail elf12 = new DebtDetail();
        elf12.setDebtId(debt.getId());
        elf12.setGasId(2);
        elf12.setAmount(request.getDebtElf12kg());
        debtDetailRepository.save(elf12);
      }
      if(request.getDebtElf39kg() != 0) {
        DebtDetail elf39 = new DebtDetail();
        elf39.setDebtId(debt.getId());
        elf39.setGasId(3);
        elf39.setAmount(request.getDebtElf39kg());
        debtDetailRepository.save(elf39);
      }
      if(request.getDebtB12() != 0) {
        DebtDetail b12 = new DebtDetail();
        b12.setDebtId(debt.getId());
        b12.setGasId(4);
        b12.setAmount(request.getDebtB12());
        debtDetailRepository.save(b12);
      }
      if(request.getDebtB45() != 0) {
        DebtDetail b45 = new DebtDetail();
        b45.setDebtId(debt.getId());
        b45.setGasId(5);
        b45.setAmount(request.getDebtB45());
        debtDetailRepository.save(b45);
      }

      return new BaseResponse(1, "Lưu phiếu nhập thành công.", importCoupon);
    }
    catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse(0, "Fail to create new inWarehouse.", null);
    }
  }

  @Override
  public BaseResponse tableInWarehouse(String dateFrom, String dateTo) {
    try {
      List<InWarehouseResponse> listData = new ArrayList<>();
      List<ImportCoupon> importCouponList = importCouponRepository.findAllByDatePartition(dateFrom, dateTo);

      for (ImportCoupon importCoupon : importCouponList) {
        InWarehouseResponse response = new InWarehouseResponse();
        response.setDateIn(importCoupon.getDateAdded().toString());
        response.setPersonIn(importCoupon.getPersonAdded());
        response.setTotalMoney(importCoupon.getTotalMoney());
        response.setPayment(importCoupon.getPayment());
        response.setNote(importCoupon.getNote());
        response.setOther(importCoupon.getOther());
        response.setUnit("Bình");

        List<ImportCouponDetail> importCouponDetailList =
            importCouponDetailRepository.findAllByIdImportCoupon(importCoupon.getId());
        if (!importCouponDetailList.isEmpty()) {
          for (ImportCouponDetail importCouponDetail : importCouponDetailList){
            int idGas = importCouponDetail.getIdGas();
            switch (idGas) {
              case 1:
                response.setElf6kg(importCouponDetail.getAmount());
                break;
              case 2:
                response.setElf12kg(importCouponDetail.getAmount());
                break;
              case 3:
                response.setElf39kg(importCouponDetail.getAmount());
                break;
              case 4:
                response.setB12(importCouponDetail.getAmount());
                break;
              case 5:
                response.setB45(importCouponDetail.getAmount());
                break;
              default:
                response.setElf6kg(0);
                response.setElf12kg(0);
                response.setElf39kg(0);
                response.setB12(0);
                response.setB45(0);
            }
          }
        }

        PayShell payShell = payShellRepository.findById(importCoupon.getIdPayShell()).get();
        if(payShell != null) {
          List<PayShellDetail> payShellDetailList = payShellDetailRepository.findAllByIdPayShell(payShell.getId());
          if (!payShellDetailList.isEmpty()) {
            for (PayShellDetail payShellDetail : payShellDetailList) {
              int idGas = payShellDetail.getIdGas();
              switch (idGas) {
                case 1:
                  response.setPayShellElf6kg(payShellDetail.getAmount());
                  break;
                case 2 :
                  response.setPayShellElf12kg(payShellDetail.getAmount());
                  break;
                case 3:
                  response.setPayShellElf39kg(payShellDetail.getAmount());
                  break;
                case 4:
                  response.setPayShellB12(payShellDetail.getAmount());
                  break;
                case 5:
                  response.setPayShellB45(payShellDetail.getAmount());
                  break;
                default:
                  response.setPayShellElf6kg(0);
                  response.setPayShellElf12kg(0);
                  response.setPayShellElf39kg(0);
                  response.setPayShellB12(0);
                  response.setPayShellB45(0);
              }
            }
          }
        }

        try {
          Debt debt = debtRepository.findById(importCoupon.getIdDebt()).get();
          if(debt != null) {
            response.setDebtMoney(debt.getDebtMoney());
            List<DebtDetail> debtDetailList = debtDetailRepository.findAllByDebtId(debt.getId());
            if (!debtDetailList.isEmpty()) {
              for (DebtDetail debtDetail : debtDetailList) {
                int gasId = debtDetail.getGasId();
                switch (gasId) {
                  case 1:
                    response.setDebtElf6kg(debtDetail.getAmount());
                    break;
                  case 2:
                    response.setDebtElf12kg(debtDetail.getAmount());
                    break;
                  case 3:
                    response.setDebtElf39kg(debtDetail.getAmount());
                    break;
                  case 4:
                    response.setDebtB12(debtDetail.getAmount());
                    break;
                  case 5:
                    response.setDebtB45(debtDetail.getAmount());
                    break;
                  default:
                    break;
                }
              }
            }
          }
        }
        catch (Exception ex) {
          logger.error(ex.getMessage(), ex);
        }

        listData.add(response);
      }

      return new BaseResponse(1, "Lấy thông tin nhập kho thành công.", listData);
    }
    catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse(0, "Lỗi khi lấy tất cả thông tin nhập kho.", null);
    }
  }
}
