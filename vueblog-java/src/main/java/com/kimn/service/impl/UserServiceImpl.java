package com.kimn.service.impl;

import com.kimn.entity.User;
import com.kimn.mapper.UserMapper;
import com.kimn.service.UserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author kimn
 * @since 2021-08-07
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
