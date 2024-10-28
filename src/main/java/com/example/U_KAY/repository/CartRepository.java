package com.example.U_KAY.repository;

import com.example.U_KAY.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository <CartEntity, Integer> {
    public CartEntity findByCartId(int cartId);
}
