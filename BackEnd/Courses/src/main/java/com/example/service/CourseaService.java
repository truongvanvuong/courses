package com.example.service;

import java.util.Set;

import com.example.model.Coursea;

public interface CourseaService {
	public Coursea addCourses(Coursea coursea);
	public Coursea updateCoursea(Coursea coursea);
	
	public Set<Coursea> getCourseas();
	
	public Coursea getCoursea(Long courseaId);
	public void deleteCoursea(Long courseaId);
	public Set<Coursea> searchCourses(String keyword);
	
}
