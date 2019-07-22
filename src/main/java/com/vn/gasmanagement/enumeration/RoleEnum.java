package com.vn.gasmanagement.enumeration;

import java.util.HashMap;
import java.util.Map;

public enum  RoleEnum {
  ROLE_WORKER(1, "Nhân viên"),
  ROLE_MANAGER(2, "Quản lí")
  ;

  private final int value;
  private final String displayValue;

  RoleEnum(int value, String displayValue) {
    this.value = value;
    this.displayValue = displayValue;
  }

  public int getValue() { return value; }

  public String getDisplayValue() { return displayValue; }

  public static RoleEnum fromValue(int value) {
    for(RoleEnum advert : RoleEnum.values()) {
      if(advert.getValue() == value){
        return advert;
      }
    }
    return null;
  }

  public static Map<Integer, String> toHashMap() {
    Map<Integer, String> adverts = new HashMap<>();
    for(RoleEnum advert : RoleEnum.values()){
      adverts.put(advert.getValue(), advert.getDisplayValue());
    }
    return adverts;
  }
}
