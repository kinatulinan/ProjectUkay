package com.Product.Ukay.UkayRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Product.Ukay.UkayEntity.AccountEntity;

public interface AccountRepository extends JpaRepository <AccountEntity, Integer> {
    boolean existsByUsername(String username);
}
