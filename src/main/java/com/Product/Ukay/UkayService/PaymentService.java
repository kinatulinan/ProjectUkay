package com.Product.Ukay.UkayService;

import com.Product.Ukay.UkayEntity.PaymentEntity;

import java.util.List;
import java.util.Optional;

public interface PaymentService {
    List<PaymentEntity> getAllPayments();
    PaymentEntity savePayment(PaymentEntity payment);
    Optional<PaymentEntity> getPaymentById(int id);
    void deletePayment(int id);
}