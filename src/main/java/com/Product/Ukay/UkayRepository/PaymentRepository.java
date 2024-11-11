package com.Product.Ukay.UkayRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Product.Ukay.UkayEntity.PaymentEntity;

public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer> {

    List<PaymentEntity> findByUser_Userid(int userid);

}
