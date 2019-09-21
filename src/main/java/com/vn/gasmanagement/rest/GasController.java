package com.vn.gasmanagement.rest;

import com.vn.gasmanagement.payload.request.GasRequest;
import com.vn.gasmanagement.service.impl.GasServiceImpl;
import javax.persistence.criteria.CriteriaBuilder.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GasController {

  @Autowired
  GasServiceImpl gasService;

  @PostMapping(value = "/save-gas")
  public ResponseEntity<?> saveGasType(@RequestBody GasRequest request) {
    return new ResponseEntity<>(gasService.saveGasType(request), HttpStatus.OK);
  }

  @GetMapping(value = "/get-all-gas")
  public ResponseEntity<?> getAllGas() {
    return new ResponseEntity<>(gasService.getListGas(), HttpStatus.OK);
  }

  @GetMapping(value = "/delete-gas")
  public ResponseEntity<?> deleteGas(@RequestParam Integer id) {
    return new ResponseEntity<>(gasService.deleteGasType(id), HttpStatus.OK);
  }
}
