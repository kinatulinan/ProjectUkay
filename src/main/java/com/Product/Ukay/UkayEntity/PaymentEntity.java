package com.Product.Ukay.UkayEntity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "payment")
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentid;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column
    private LocalDate paymentDate;

    @Column(length = 100)
    private String transactionId;

    @Column
    private String notes;

    @Enumerated(EnumType.STRING)
    @Column
    private PaymentMethod method;

    // Many-to-One Relationship
    @ManyToOne
    @JoinColumn(name = "userid")
    private UserEntity user;

    public long getPaymentid() {
        return paymentid;
    }

    public void setPaymentid(int paymentid) {
        this.paymentid = paymentid;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public PaymentMethod getPaymentMethod() {
        return method;
    }

    public void setPaymentMethod(PaymentMethod method) {
        this.method = method;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

}

