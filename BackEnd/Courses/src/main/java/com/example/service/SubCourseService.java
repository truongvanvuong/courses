package com.example.service;

import java.util.Set;

import com.example.model.SubCourse;

public interface SubCourseService {
	public SubCourse addSubCourse(SubCourse subCourse);
	public Set<SubCourse> getSubscribedCourses(Long userId);
	public Set<SubCourse> getSubscribedCoursesItem(Long courseaId);
	public boolean checkSubscribed(Long courseId, Long userId);
	public Set<SubCourse> getSubCourses();
}
