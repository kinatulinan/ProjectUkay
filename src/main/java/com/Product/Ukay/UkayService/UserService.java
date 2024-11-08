package com.Product.Ukay.UkayService;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Product.Ukay.UkayEntity.AccountEntity;
import com.Product.Ukay.UkayEntity.UserEntity;
import com.Product.Ukay.UkayRepository.AccountRepository;
import com.Product.Ukay.UkayRepository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean isUsernameOrEmailTaken(String username, String email) {
        return userRepository.existsByUsername(username) || userRepository.existsByEmailadd(email);
    }

    public UserEntity saveUser(UserEntity user, String username, String password) throws Exception {
        if (accountRepository.existsByUsername(username)) {
            throw new Exception("Username already exists");
        }

        AccountEntity account = new AccountEntity();
        account.setUsername(username);
        account.setPassword(password);

        user.setAccount(account);

        return userRepository.save(user);
    }
}
