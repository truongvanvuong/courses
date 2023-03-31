package com.example.Repostiory;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.model.SubCourse;

public interface SubCourseRepostiory extends JpaRepository<SubCourse, Long> {
	
	Optional<SubCourse> findByCoursea_IdAndUser_Id(Long courseaId, Long userId);
	Set<SubCourse> findByUserId(Long userId);
	Set<SubCourse> findByCourseaId(Long courseaId);
	

}
