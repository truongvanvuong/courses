package com.example.Repostiory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.model.Admin;

@Repository
public interface AdminRepostiory extends JpaRepository<Admin, String> {

	Admin findByName(String name);

	Optional<Admin> findById(Long adminId);
}
