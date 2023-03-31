package com.example.service;


import com.example.model.User;

public interface UserService {
	public User addUser(User user);
	public User updateUser(User user);
	public User getUser(Long userId);
}
