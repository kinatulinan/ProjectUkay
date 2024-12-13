package com.Product.Ukay.UkayController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Product.Ukay.Dto.UserDto;
import com.Product.Ukay.UkayEntity.UserEntity;
import com.Product.Ukay.UkayService.AccountService;
import com.Product.Ukay.UkayService.UserService;
import com.Product.Ukay.response.LoginResponse;

@RestController
@CrossOrigin
@RequestMapping("api/register")
public class UserController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private UserService userService;


    @GetMapping("/health")
    public String healthCheck() {
        return "Server is running";
    }

    @PostMapping(path = "/save")
    public String saveAccount (@RequestBody UserDto userDto){
        String user_id = accountService.addAccount(userDto);
        return user_id;
    }

 
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser (@RequestBody UserDto userDto) {
        LoginResponse loginResponse = accountService.loginUser(userDto);
        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<UserEntity> getUserByUsername(@PathVariable String username) {    
    UserEntity user = userService.findByUsername(username);
    if (user != null) {
        return ResponseEntity.ok(user);
    } else {
        return ResponseEntity.notFound().build();
    }
}

}