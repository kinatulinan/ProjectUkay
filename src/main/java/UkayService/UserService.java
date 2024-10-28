package UkayService;

import UkayEntity.UserEntity;
import UkayRepository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository urepo;

    public UserService(){
        super();
    }


    //Create
    public UserEntity postUserRecord(UserEntity user){
        return urepo.save(user);
    }

    //Read of CRUD
    public List<UserEntity> getAllUsers(){
        return urepo.findAll();
    }

    // Update of CRUD
    public UserEntity updateUserRecords(int userId, UserEntity newUserRecords) {
        UserEntity user = urepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User with ID " + userId + " not found"));

        user.setfName(newUserRecords.getfName());
        user.setmName(newUserRecords.getmName());
        user.setlName(newUserRecords.getlName());
        user.setBirthDate(newUserRecords.getBirthDate());
        user.setAddress(newUserRecords.getAddress());
        user.setEmailAddress(newUserRecords.getEmailAddress());
        user.setPhoneNumber(newUserRecords.getPhoneNumber());
        user.setUsername(newUserRecords.getUsername());
        user.setPassword(newUserRecords.getPassword());

        return urepo.save(user);
    }

    public String deleteUser(int userId) {
        String msg;
        if (urepo.findById(userId).isPresent()) {
            urepo.deleteById(userId); // Use productId instead of null
            msg = "Product deleted!";
        } else {
            msg = "Product with ID " + userId + " not found!";
        }
        return msg;
    }
}
