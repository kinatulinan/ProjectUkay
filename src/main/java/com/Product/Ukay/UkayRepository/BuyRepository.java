package com.Product.Ukay.UkayRepository;

import com.Product.Ukay.UkayEntity.BuyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BuyRepository extends JpaRepository<BuyEntity, Integer> {
}
