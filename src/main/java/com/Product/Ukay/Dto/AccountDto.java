package com.Product.Ukay.Dto;

public class AccountDto {

    private String username;
    private String password;

    public AccountDto(String password, String username) {
        this.password = password;
        this.username = username;
    }

    public AccountDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "AccountDto{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}

