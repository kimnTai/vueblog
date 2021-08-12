package com.kimn.common.exception;

import com.kimn.common.lang.Result;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.ShiroException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

/**
 * 全局異常處理，RestControllerAdvice 捕獲所有 Controller異常
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 捕捉shiro的異常
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(value = ShiroException.class)
    public Result handler(ShiroException e) {
        log.error("shiro異常 : -------------{}", e.getMessage());
        // Spring框架的HttpStatus是列舉，Hutool的HttpStatus是int
        return Result.fail(401, e.getMessage(), null);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public Result handler(MethodArgumentNotValidException e) throws IOException {
        log.error("實體校驗異常 : -------------{}", e.getMessage());
        BindingResult bindingResult = e.getBindingResult();
        ObjectError objectErrors = bindingResult.getAllErrors().stream().findFirst().get();

        return Result.fail(objectErrors.getDefaultMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = IllegalAccessException.class)
    public Result handler(IllegalAccessException e) throws IOException {
        log.error("Assert時異常 : -------------{}", e.getMessage());
        return Result.fail(e.getMessage());
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = RuntimeException.class)
    public Result handler(RuntimeException e) throws IOException {
        log.error("運行時異常 : -------------{}", e.getMessage());
        return Result.fail(e.getMessage());
    }


}
