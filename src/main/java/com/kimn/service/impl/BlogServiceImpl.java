package com.kimn.service.impl;

import com.kimn.entity.Blog;
import com.kimn.mapper.BlogMapper;
import com.kimn.service.BlogService;
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
public class BlogServiceImpl extends ServiceImpl<BlogMapper, Blog> implements BlogService {

}
