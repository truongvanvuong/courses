package com.example.service;

import com.example.model.Admin;

public interface AdminService {
	public Admin addAdmin(Admin admin);
	public Admin updateAdmin(Admin admin);
	public Admin getAdmin(Long adminId);
}
