package com.Product.Ukay.UkayController;

import com.Product.Ukay.UkayEntity.LoginUserEntity;
import com.Product.Ukay.UkayService.LoginUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class LoginUserController {

    @Autowired
    LoginUserService lserv;


    @GetMapping("/print")
    public String print(){
        return "Test Login ";
    }

    @PostMapping("/postLogin")
    public LoginUserEntity postLoginRecord(@RequestBody LoginUserEntity login){
        return lserv.postLoginRecord(login);
    }

    @GetMapping("/getLogin")
    public List<LoginUserEntity> getAllLogin(){
        return lserv.getAllLogin();
    }

    @PutMapping("/updateLogin")
    public LoginUserEntity updateLoginRecords(@RequestParam int loginId, @RequestBody LoginUserEntity newLoginRecords){
        return lserv.updateLoginRecords(loginId, newLoginRecords);
    }


}
