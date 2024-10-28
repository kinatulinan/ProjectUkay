package com.Product.Ukay.UkayRepository;

import com.Product.Ukay.UkayEntity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository <CartEntity, Integer> {
    public CartEntity findByCartId(int cartId);
}