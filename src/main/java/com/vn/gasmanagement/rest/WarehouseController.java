package com.vn.gasmanagement.rest;

import com.vn.gasmanagement.payload.request.DatePartition;
import com.vn.gasmanagement.payload.request.InWarehouseRequest;
import com.vn.gasmanagement.payload.response.BaseResponse;
import com.vn.gasmanagement.service.impl.WarehouseServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/warehouse")
public class WarehouseController {

  private Logger logger = LoggerFactory.getLogger(WarehouseController.class);

  @Autowired
  WarehouseServiceImpl warehouseService;

  @PostMapping(value = "/create-import")
  public BaseResponse createInWarehouse(@RequestBody InWarehouseRequest request) {
    return warehouseService.inWarehouse(request);
  }

  @GetMapping(value = "/table-in-warehouse")
  public BaseResponse tableInWarehouse(@RequestParam String dateFrom,@RequestParam String dateTo) {
    return warehouseService.tableInWarehouse(dateFrom, dateTo);
  }

  @GetMapping(value="/table-out-warehouse")
  public BaseResponse tableOutWarehouse(@RequestParam String dateFrom,@RequestParam String dateTo) {
    return warehouseService.tableOutWarehouse(dateFrom, dateTo);
  }

  @GetMapping(value="/table-exist-end")
  public BaseResponse tableExistEnd(@RequestParam String dateFrom,@RequestParam String dateTo) {
    return warehouseService.tableExistEnd(dateFrom, dateTo);
  }
}
