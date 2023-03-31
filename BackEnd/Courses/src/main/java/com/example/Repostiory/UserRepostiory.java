package com.example.Repostiory;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.User;

@Repository
public interface UserRepostiory extends JpaRepository<User, String> {

	User findByEmail(String email);

	Optional<User> findById(Long userId);
}
