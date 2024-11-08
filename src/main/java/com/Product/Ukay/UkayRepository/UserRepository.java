package com.Product.Ukay.UkayRepository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.Product.Ukay.UkayEntity.UserEntity;

@EnableJpaRepositories
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findOneByUsernameAndPassword (String username, String password);
    UserEntity findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmailadd(String emailadd);
}
