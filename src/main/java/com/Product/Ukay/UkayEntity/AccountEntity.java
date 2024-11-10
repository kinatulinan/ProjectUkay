package com.Product.Ukay.UkayEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AccountEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int accountId;

    private String username;
    private String password;

    public AccountEntity(int accountId, String username, String password) {
        this.accountId = accountId;
        this.username = username;
        this.password = password;
    }

    public AccountEntity() {
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
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
}

