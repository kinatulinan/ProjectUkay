package com.Product.Ukay.payloadreponse;

public class LoginMessage {
    String message;
    Boolean status;

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LoginMessage(String message, Boolean status) {
        this.message = message;
        this.status = status;
    }
}
