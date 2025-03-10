package com.Product.Ukay.UkayRepository;

import com.Product.Ukay.UkayEntity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository <ProductEntity, Integer> {

    public ProductEntity findByProductId(int productId);
}