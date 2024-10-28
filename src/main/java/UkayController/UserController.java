package UkayController;


import UkayEntity.UserEntity;
import UkayService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userv;


    @GetMapping("/print")
    public String print(){
        return "Test user entity";
    }

    @PostMapping("/postUser")
    public UserEntity postUserRecord(@RequestBody UserEntity user){
        return userv.postUserRecord(user);
    }

    @GetMapping("/getUser")
    public List<UserEntity> getAllUsers(){
        return userv.getAllUsers();
    }

    @PutMapping("/updateUser")
    public UserEntity updateUserRecords(@RequestParam int userId, @RequestBody UserEntity newUserRecords){
        return userv.updateUserRecords(userId, newUserRecords);
    }

    @DeleteMapping("/deleteUser/{userId}")
    public String deleteUser(@PathVariable int userId){

        return userv.deleteUser(userId);
    }
}
