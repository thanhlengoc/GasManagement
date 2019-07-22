package com.vn.gasmanagement.payload.response;

public class BaseResponse<T> {

  private int returnCode;
  private String returnMessage;
  private T result;

  public BaseResponse(int returnCode, String returnMessage, T result) {
    this.returnCode = returnCode;
    this.returnMessage = returnMessage;
    this.result = result;
  }

//  public class ErrorResponse extends BaseResponse {
//
//    public ErrorResponse(String returnMessage, T result) {
//      super(0, returnMessage, result);
//    }
//  }
//
//  public class SuccessResponse extends BaseResponse {
//
//    public SuccessResponse(String returnMessage, T result) {
//      super(1, returnMessage, result);
//    }
//  }

  public int getReturnCode() { return returnCode; }

  public void setReturnCode(int returnCode) { this.returnCode = returnCode; }

  public String getReturnMessage() { return returnMessage; }

  public void setReturnMessage(String returnMessage) { this.returnMessage = returnMessage; }

  public T getResult() { return result; }

  public void setResult(T result) { this.result = result; }
}
