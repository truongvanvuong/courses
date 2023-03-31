package com.example.Repostiory;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Coursea;
import com.example.model.Lessons;

public interface LessonsRepostiory extends JpaRepository<Lessons, Long> {

	Set<Lessons> findByCoursea(Coursea coursea);
	
}
