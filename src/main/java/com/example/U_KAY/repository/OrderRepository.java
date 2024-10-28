package com.example.U_KAY.repository;

import com.example.U_KAY.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {
    public OrderEntity findByOrderId(int orderId);
}
