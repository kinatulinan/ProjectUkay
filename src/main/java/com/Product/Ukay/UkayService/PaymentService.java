package com.Product.Ukay.UkayService;

import com.Product.Ukay.UkayEntity.PaymentEntity;
import com.Product.Ukay.UkayRepository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository pRepo;

    public List<PaymentEntity> getAllPayments() {
        return pRepo.findAll();
    }

    public PaymentEntity savePayment(PaymentEntity payment) {
        return pRepo.save(payment);
    }

    public Optional<PaymentEntity> getPaymentById(int id) {
        return pRepo.findById(id);
    }

    public void deletePayment(int id) {
        pRepo.deleteById(id);
    }
}
