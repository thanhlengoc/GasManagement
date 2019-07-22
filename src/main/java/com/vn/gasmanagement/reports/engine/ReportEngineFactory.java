package com.vn.gasmanagement.reports.engine;

import com.vn.gasmanagement.constant.ReportConstant;

public class ReportEngineFactory {

  public static final ReportEngine createInstance(final String name)
  {
    final String reportType;
    reportType = name.toLowerCase();
    switch (reportType){
      case ReportConstant.PDF_FILE_TYPE:
        return new PDFReportEngine();
      case ReportConstant.EXCEL_FILE_TYPE:
        return new ExcelReportEngine();
      default:
        return null;
    }
  }
}
