package com.vn.gasmanagement.reports.engine;

import com.vn.gasmanagement.constant.ReportConstant;
import java.io.File;
import java.io.InputStream;
import java.util.Objects;
import net.sf.jasperreports.engine.JasperCompileManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class AbstractReportEngine implements ReportEngine {

  protected static Logger logger = LoggerFactory
      .getLogger(AbstractReportEngine.class.getCanonicalName());

  /**
   * Compile Jasper report JrXML file to Jasper report JASPER compiled file
   *
   * @return Successful or not
   */
  protected static final boolean compileReport(final String inputFileName,
      final String outputFileName) {
    try {
      JasperCompileManager.compileReportToFile(inputFileName, outputFileName);
      return true;
    } catch (Exception ex) {
      ex.printStackTrace();
      logger.error("Can not compile report: " + ex.getMessage());
      return false;
    }
  }

  /**
   * Prepare for reporting: check file exist, if not compile then compile them
   */
  protected static final InputStream prepareReport(String reportTemplatePath) {

    //file name is not empty
    if (reportTemplatePath == null || "".equals(reportTemplatePath)) {
      logger.error("reportTemplatePath can not be empty.");
      return null;
    }
    InputStream input = Thread.currentThread().getContextClassLoader()
        .getResourceAsStream(reportTemplatePath);
    //templateFile = ResourceUtils.getFile("classpath:" + reportTemplatePath);
    if (Objects.isNull(input)) {
      logger.error(String.format("Template file '%s' is not found.", reportTemplatePath));
      return null;
    }
    InputStream jasperFileAtClassPath = null;
    //if template file is not yet compile, then compile it
    final String jasperFileName;
    if (reportTemplatePath.endsWith(".jrxml")) {
      String currentDir = "";
      File currentDirFile = new File(".");
      String helper = currentDirFile.getAbsolutePath();
      currentDir = helper.substring(0, helper.length() - 1);
      jasperFileName =
          reportTemplatePath.substring(0, reportTemplatePath.indexOf(".jrxml")) + ".jasper";
      logger.error(String.format("jasperFileName file '%s' is .",
          currentDir + ReportConstant.PATH_WRITE_REPORT_TEMPLATE_FILE + jasperFileName));
      jasperFileAtClassPath = Thread.currentThread().getContextClassLoader()
          .getResourceAsStream(jasperFileName);
      if (Objects.nonNull(jasperFileAtClassPath)) {
        return jasperFileAtClassPath;
      } else {
        final File jasperFile = new File(
            currentDir + ReportConstant.PATH_WRITE_REPORT_TEMPLATE_FILE + jasperFileName);
        if (Objects.nonNull(jasperFile) && !jasperFile.exists()) {
          if (!compileReport(
              currentDir + ReportConstant.PATH_WRITE_REPORT_TEMPLATE_FILE + reportTemplatePath,
              currentDir + ReportConstant.PATH_WRITE_REPORT_TEMPLATE_FILE + jasperFileName)) {
            return null;
          }
        }
      }
    } else if (reportTemplatePath.endsWith(".jasper")) {
      jasperFileName = reportTemplatePath;
    } else {
      jasperFileName = null;
    }
    jasperFileAtClassPath = Thread.currentThread().getContextClassLoader()
        .getResourceAsStream(jasperFileName);
    return jasperFileAtClassPath;
  }

}
