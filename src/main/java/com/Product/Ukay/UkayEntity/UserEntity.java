package com.Product.Ukay.UkayEntity;

import jakarta.persistence.*;
import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int user_id;

    @Column(name = "f_name")
    private String fname;

    @Column(name = "m_name")
    private String mname;

    @Column(name = "l_name")
    private String lname;

    @DateTimeFormat(pattern = "MM/dd/yyyy")
    @Column(name = "birth_date")
    private LocalDate birthdate;

    private String address;

    @Column(name = "email_address")
    private String emailadd;

    @Column(name = "phone_number")
    private String mobile;

    private String username;
    private String password;

    public UserEntity(int user_id, String fname, String mname, String lname, LocalDate birthdate, String address, String emailadd, String mobile, String username, String password) {
        this.user_id = user_id;
        this.fname = fname;
        this.mname = mname;
        this.lname = lname;
        this.birthdate = birthdate;
        this.address = address;
        this.emailadd = emailadd;
        this.mobile = mobile;
        this.username = username;
        this.password = password;
    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "accountId", referencedColumnName = "accountId")
    private AccountEntity account;

    public AccountEntity getAccount() {
        return account;
    }

    public void setAccount(AccountEntity account) {
        this.account = account;
    }

    public UserEntity(){

    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }



    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmailadd() {
        return emailadd;
    }

    public void setEmailadd(String emailadd) {
        this.emailadd = emailadd;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
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

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    @Override
    public String toString() {
        return "UserEntity{" +
                "user_id=" + user_id +
                ", fname='" + fname + '\'' +
                ", mname='" + mname + '\'' +
                ", lname='" + lname + '\'' +
                ", birthdate=" + birthdate +
                ", address='" + address + '\'' +
                ", emailadd='" + emailadd + '\'' +
                ", mobile=" + mobile +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}

