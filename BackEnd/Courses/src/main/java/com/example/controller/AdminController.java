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

import com.example.Repostiory.AdminRepostiory;
import com.example.Repostiory.PasswordEncoder;
import com.example.model.Admin;
import com.example.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

	@Autowired
	private AdminRepostiory adminRepostiory;
	@Autowired
	private AdminService adminService;

	@PostMapping("/login")
	public ResponseEntity<?> loginAdmin(@RequestBody Admin adminData) {
		Admin admin = adminRepostiory.findByName(adminData.getName());
		if (admin == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
		if (!admin.getPassword().equals(adminData.getPassword())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
		}

		// Generate authentication token
		String token = generateToken(admin.getPassword());

		// Return user information and authentication token
		Map<String, Object> response = new HashMap<>();
		response.put("admin", admin);
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
	// add Admin
		@PostMapping("/")
		public ResponseEntity<?> addAdmin(@RequestBody Admin admin) {
			Admin admin1 = this.adminService.addAdmin(admin);
			return ResponseEntity.ok(admin1);
		}

		// get Admin
		@GetMapping("/{adminId}")
		public Admin getAdmin(@PathVariable("adminId") Long adminId) {
			return this.adminService.getAdmin(adminId);
		}
		//update Admin
		@PutMapping("/")
		public Admin updateAdmin(@RequestBody Admin admin) {
			return this.adminService.updateAdmin(admin);
		}
}
