package com.vn.gasmanagement.reports.engine;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;

public class ExcelReportEngine extends AbstractReportEngine {

  /**
   * Render Jasper Report template file (*.jrxml) with your data list to Excel (XLSX) file
   * @param reportTemplatePath: path to Jasper Report template file (*.jrxml)
   * @param data your data list to fill into Jasper Report
   * @param response the HTTP Servlet Response
   * @return
   */
  @Override
  public boolean render(final String reportTemplatePath, final Map parameters, final List data, final HttpServletResponse response) {

    final InputStream jasperFileName;
    jasperFileName = prepareReport(reportTemplatePath);
    if (jasperFileName == null)
      return false;

    // Fill return object
    response.reset();
    response.resetBuffer();
    response.setContentType("application/vnd.ms-excel");
    response.setHeader("Content-Disposition", "attachment; filename=" + "Report" + ".xlsx");
    try {
      final ServletOutputStream output = response.getOutputStream();
      final Map<String, Object> params = (Map<String, Object>)parameters;
      final JRDataSource ds = new JRBeanCollectionDataSource(data);

      JasperReport report = (JasperReport) JRLoader.loadObject(jasperFileName);
      JasperPrint print = JasperFillManager.fillReport(report, params, ds);

      JRXlsxExporter exporter = new JRXlsxExporter();
      exporter.setExporterInput(new SimpleExporterInput(print));
      exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(response.getOutputStream()));
      SimpleXlsxReportConfiguration config = new SimpleXlsxReportConfiguration();
      config.setDetectCellType(Boolean.TRUE);
      config.setCollapseRowSpan(Boolean.FALSE);
      exporter.setConfiguration(config);
      exporter.exportReport();

      output.flush();
      output.close();
    } catch (Exception e) {
      logger.error("Can not Fill report & create Excel: " +e.getMessage(), e);
      return false;
    }

    return true;
  }

}
