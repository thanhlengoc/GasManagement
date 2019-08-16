package com.vn.gasmanagement.service;

import com.vn.gasmanagement.payload.request.InWarehouseRequest;
import com.vn.gasmanagement.payload.response.BaseResponse;

public interface WarehouseService {

  BaseResponse inWarehouse(InWarehouseRequest request);

  BaseResponse tableInWarehouse(String dateFrom, String dateTo);
  BaseResponse tableOutWarehouse(String dateFrom, String dateTo);
  BaseResponse tableExistEnd(String dateFrom, String dateTo);
}
