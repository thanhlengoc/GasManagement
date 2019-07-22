package com.vn.gasmanagement.enumeration;

import java.util.HashMap;
import java.util.Map;

public enum  GasTypeName {

  ;

  private final int value;
  private final String displayValue;

  GasTypeName(int value, String displayValue) {
    this.value = value;
    this.displayValue = displayValue;
  }

  public int getValue() { return value; }

  public String getDisplayValue() { return displayValue; }

  public static GasTypeName fromValue(int value) {
    for(GasTypeName advert : GasTypeName.values()) {
      if(advert.getValue() == value){
        return advert;
      }
    }
    return null;
  }

  public static Map<Integer, String> toHashMap() {
    Map<Integer, String> adverts = new HashMap<>();
    for(GasTypeName advert : GasTypeName.values()){
      adverts.put(advert.getValue(), advert.getDisplayValue());
    }
    return adverts;
  }
}
