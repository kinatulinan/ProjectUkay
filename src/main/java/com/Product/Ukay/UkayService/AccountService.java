package com.Product.Ukay.UkayService;

import com.Product.Ukay.Dto.UserDto;
import com.Product.Ukay.response.LoginResponse;

public interface AccountService {
    String addAccount(UserDto userDto);
    LoginResponse loginUser(UserDto userDto);


}
