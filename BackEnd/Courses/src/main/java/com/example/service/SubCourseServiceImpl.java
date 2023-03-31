package com.example.service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Repostiory.SubCourseRepostiory;
import com.example.model.SubCourse;


@Service
public class SubCourseServiceImpl implements SubCourseService{

	@Autowired
	private SubCourseRepostiory subCourseRepostiory;
	
	@Override
	public SubCourse addSubCourse(SubCourse subCourse) {
		return this.subCourseRepostiory.save(subCourse);
	}

	@Override
	public boolean checkSubscribed(Long courseId, Long userId) {
		 Optional<SubCourse> subCourse = subCourseRepostiory.findByCoursea_IdAndUser_Id(courseId, userId);
		    return subCourse.isPresent();
	}

	@Override
	public Set<SubCourse> getSubscribedCourses(Long userId) {
		 return this.subCourseRepostiory.findByUserId(userId);
	}

	@Override
	public Set<SubCourse> getSubCourses() {
		return new HashSet<>(this.subCourseRepostiory.findAll());
	}

	@Override
	public Set<SubCourse> getSubscribedCoursesItem(Long courseaId) {
		
		 return this.subCourseRepostiory.findByCourseaId(courseaId);
	}

	

}
