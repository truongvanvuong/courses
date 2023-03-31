package com.example.controller;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Repostiory.PasswordEncoder;
import com.example.Repostiory.UserRepostiory;
import com.example.model.User;
import com.example.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	@Autowired
	private UserRepostiory userRepostiory;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<?> loginAdmin(@RequestBody User userData) {
		User user = userRepostiory.findByEmail(userData.getEmail());
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
		if (!user.getPassword().equals(userData.getPassword())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
		}

		// Generate authentication token
		String token = generateToken(user.getPassword());

		// Return user information and authentication token
		Map<String, Object> response = new HashMap<>();
		response.put("user", user);
		response.put("token", token);
		return ResponseEntity.ok(response);
	}

	private String generateToken(String password) {
		String token = null;
		try {
			// Create a message digest using SHA-256 algorithm
			MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");

			// Add the userName and a secret key to the message digest
			String data = password + "my-secret-key";
			messageDigest.update(data.getBytes(StandardCharsets.UTF_8));

			// Get the message digest value
			byte[] digest = messageDigest.digest();

			// Encode the digest value as a hexadecimal string
			token = PasswordEncoder.generateToken(digest);
		} catch (NoSuchAlgorithmException e) {
			// Handle the exception
		}
		return token;
	}
	// add user
		@PostMapping("/")
		public ResponseEntity<?> addUser(@RequestBody User user) {
			User user1 = this.userService.addUser(user);
			return ResponseEntity.ok(user1);
		}

		// get user
		@GetMapping("/{userId}")
		public User getUser(@PathVariable("userId") Long userId) {
			return this.userService.getUser(userId);
		}
		//update User
		@PutMapping("/")
		public User updateUser(@RequestBody User user) {
			 return this.userService.updateUser(user);
		
		}
}

