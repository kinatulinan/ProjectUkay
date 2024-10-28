package com.example.U_KAY.repository;

import com.example.U_KAY.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository <ProductEntity, Integer> {

    public ProductEntity findByProductId(int productId);
}
