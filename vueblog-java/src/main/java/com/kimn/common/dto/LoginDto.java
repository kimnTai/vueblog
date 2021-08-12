package com.kimn.common.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
public class LoginDto implements Serializable {

    @NotBlank(message = "使用者名稱不能為空白")
    private String username;

    @NotBlank(message = "密碼不能為空白")
    private String password;

}
