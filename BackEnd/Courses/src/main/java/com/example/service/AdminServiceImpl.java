package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Repostiory.AdminRepostiory;
import com.example.model.Admin;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminRepostiory adminRepostiory;

	@Override
	public Admin addAdmin(Admin admin) {
		return this.adminRepostiory.save(admin);
	}

	@Override
	public Admin updateAdmin(Admin admin) {
		return this.adminRepostiory.save(admin);
	}

	@Override
	public Admin getAdmin(Long adminId) {
		return this.adminRepostiory.findById(adminId).get();
	}

}
