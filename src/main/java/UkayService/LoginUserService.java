package UkayService;


import UkayEntity.LoginUserEntity;
import UkayEntity.ProductEntity;
import UkayRepository.LoginUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginUserService {

    @Autowired
    LoginUserRepository lrepo;


    public LoginUserService(){
        super();
    }

    //Create
    public LoginUserEntity postLoginRecord(LoginUserEntity login){
        return lrepo.save(login);
    }

    //Read of CRUD
    public List<LoginUserEntity> getAllLogin(){
        return lrepo.findAll();
    }

    public LoginUserEntity updateLoginRecords(int loginId, LoginUserEntity newLoginRecords) {
        LoginUserEntity login = lrepo.findById(loginId)
                .orElseThrow(() -> new RuntimeException("User with ID " + loginId + " not found"));


        login.setUsername(newLoginRecords.getUsername());
        login.setPassword(newLoginRecords.getPassword());


        return lrepo.save(login);
    }

    public String deleteUser(int userId) {
        String msg;
        if (lrepo.findById(userId).isPresent()) {
            lrepo.deleteById(userId); // Use productId instead of null
            msg = "Product deleted!";
        } else {
            msg = "Product with ID " + userId + " not found!";
        }
        return msg;
    }
}
