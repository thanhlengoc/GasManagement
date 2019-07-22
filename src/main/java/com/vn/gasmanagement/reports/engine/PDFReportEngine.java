package com.vn.gasmanagement.reports.engine;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;

public class PDFReportEngine extends AbstractReportEngine {

  /**
   * Render template file with data to PDF file
   * @param reportTemplatePath Jrxml or Jasper file
   * @param data list for fill in the template file
   * @param response HTTP Servlet Response
   * @return
   */
  @Override
  public boolean render(final String reportTemplatePath, final Map parameters, final List data, final HttpServletResponse response) {
    //final String jasperFileName;
    InputStream jasperFileName = prepareReport(reportTemplatePath);
    if (jasperFileName == null) {
      return false;
    }
    final byte[] bytes;
    try {
      final Map<String, Object> params = (Map<String, Object>)parameters;
      final JRDataSource ds = new JRBeanCollectionDataSource(data);
      //file file =null;
      JasperReport report = (JasperReport) JRLoader.loadObject(jasperFileName);
      JasperPrint print = JasperFillManager.fillReport(report, params, ds);

      bytes = JasperExportManager.exportReportToPdf(print);
    } catch (Exception e) {
      logger.error("Can not Fill report & create PDF: " +e.getMessage(), e);
      return false;
    }

    // Fill return object
    response.reset();
    response.resetBuffer();
    response.setContentType("application/pdf");

    try{
      final ServletOutputStream output;
      output = response.getOutputStream();

      if (bytes != null){
        output.write(bytes, 0, bytes.length);
        response.setContentLength(bytes.length);
      }
      else
        response.setContentLength(0);

      output.flush();
      output.close();
    }catch(Exception ex){
      logger.error("Can not create PDF file: " +ex.getMessage());
      return false;
    }

    return true;
  }
}
