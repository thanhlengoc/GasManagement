package com.vn.gasmanagement.service;

import com.vn.gasmanagement.modal.Gas;
import com.vn.gasmanagement.payload.request.GasRequest;
import com.vn.gasmanagement.payload.response.BaseResponse;
import java.util.List;
import org.springframework.http.ResponseEntity;

public interface GasService {

  BaseResponse saveGasType(GasRequest request);

  BaseResponse getListGas();
}
