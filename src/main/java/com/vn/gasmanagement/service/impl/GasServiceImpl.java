package com.vn.gasmanagement.service.impl;

import com.vn.gasmanagement.modal.Gas;
import com.vn.gasmanagement.payload.request.GasRequest;
import com.vn.gasmanagement.payload.response.BaseResponse;
import com.vn.gasmanagement.repository.GasRepository;
import com.vn.gasmanagement.service.GasService;
import java.sql.SQLException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class GasServiceImpl implements GasService {

  private Logger logger = LoggerFactory.getLogger(GasServiceImpl.class);

  @Autowired
  GasRepository gasRepository;

  @Override
  public BaseResponse saveGasType(GasRequest request) {
    try {
      Gas gas = new Gas();
      gas.setCode(request.getCode());
      gas.setGasName(request.getGasName());
      gas.setWeight(request.getWeight());
      gas.setColor(request.getColor());
      gas.setUnitPriceIn(request.getUnitPriceIn());
      gas.setUnitPriceOut(request.getUnitPriceOut());
      gas.setGasTypeName(request.getGasName().concat(request.getWeight().toString().concat("kg")));
      gasRepository.save(gas);
      return new BaseResponse(1,"Save gas successful.", gas);
    }
    catch (Exception ex) {
      logger.error("Exception when save gas type.");
      return new BaseResponse(0,"Save gas fail.", null);
    }
  }

  @Override
  public BaseResponse getListGas() {
    try{
      List<Gas> listGas = gasRepository.findAll();
      return new BaseResponse<>(1,"Get all gas success.", listGas);
    }
    catch (Exception ex){
      logger.error("Exception when get all gas type.");
      return new BaseResponse<>(0, "Get all gas fail.", null);
    }
  }

  @Override
  public BaseResponse deleteGasType(int id) {
    try {
      gasRepository.deleteById(id);
      return new BaseResponse<>(1, "Xóa thành công.", null);
    }
    catch (Exception ex) {
      return new BaseResponse<>(0, "Xóa thất bại.", null);
    }
  }
}
