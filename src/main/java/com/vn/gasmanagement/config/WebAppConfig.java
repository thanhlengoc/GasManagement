package com.vn.gasmanagement.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class WebAppConfig {

  private final Logger logger = LoggerFactory.getLogger(WebAppConfig.class);

  private static WebAppConfig instance = new WebAppConfig();

  public WebAppConfig() {
  }

  public static WebAppConfig getInstance() {
    return instance;
  }

}
