package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Repostiory.UserRepostiory;
import com.example.model.User;


@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepostiory userRepostiory;

	@Override
	public User addUser(User user) {
		return this.userRepostiory.save(user);
	}

	@Override
	public User updateUser(User user) {
		return this.userRepostiory.save(user);
	}

	@Override
	public User getUser(Long userId) {
		return this.userRepostiory.findById(userId).get();
	}

}
