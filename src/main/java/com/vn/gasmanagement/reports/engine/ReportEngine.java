package com.vn.gasmanagement.reports.engine;

import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;

public interface ReportEngine {

  public boolean render(final String reportTemplatePath, final Map parameters, final List data, HttpServletResponse response);
}
