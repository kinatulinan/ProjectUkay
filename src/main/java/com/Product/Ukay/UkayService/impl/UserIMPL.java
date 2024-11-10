package com.Product.Ukay.UkayService.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Product.Ukay.Dto.UserDto;
import com.Product.Ukay.UkayEntity.AccountEntity;
import com.Product.Ukay.UkayEntity.UserEntity;
import com.Product.Ukay.UkayRepository.AccountRepository;
import com.Product.Ukay.UkayRepository.UserRepository;
import com.Product.Ukay.UkayService.AccountService;
import com.Product.Ukay.response.LoginResponse;

@Service
public class UserIMPL implements AccountService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public String addAccount(UserDto userDto) {

        if (accountRepository.existsByUsername(userDto.getUsername())) {
            return "Username is already taken";
        }
        
        AccountEntity accountEntity = new AccountEntity();
        accountEntity.setUsername(userDto.getUsername());
        accountEntity.setPassword(this.passwordEncoder.encode(userDto.getPassword()));
        accountRepository.save(accountEntity);

        UserEntity userEntity = new UserEntity(
                userDto.getUser_id(),
                userDto.getFname(),
                userDto.getMname(),
                userDto.getLname(),
                userDto.getBirthdate(),
                userDto.getAddress(),
                userDto.getEmailadd(),
                userDto.getMobile(),
                userDto.getUsername(),
                this.passwordEncoder.encode(userDto.getPassword())
        );
        userRepository.save(userEntity);
        return userEntity.getUsername();
    }

    @Override
    public LoginResponse loginUser(UserDto userDto) {
        // Find user by username
        UserEntity user1 = userRepository.findByUsername(userDto.getUsername());

        // Check if the user exists
        if (user1 == null) {
            return new LoginResponse("Username does not exist", false);
        }

        // Retrieve the password from the DTO and the encoded password from the user entity
        String rawPassword = userDto.getPassword();
        String encodedPassword = user1.getPassword();

        // Check if the provided password matches the stored encoded password
        if (passwordEncoder.matches(rawPassword, encodedPassword)) {
            // Return success response if passwords match
            return new LoginResponse("Login Success", true);
        } else {
            // Return failure response if passwords do not match
            return new LoginResponse("Password does not match", false);
        }
    }
}
