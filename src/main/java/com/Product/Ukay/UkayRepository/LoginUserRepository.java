package com.Product.Ukay.UkayRepository;

import com.Product.Ukay.UkayEntity.LoginUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginUserRepository extends JpaRepository<LoginUserEntity, Integer> {
}
