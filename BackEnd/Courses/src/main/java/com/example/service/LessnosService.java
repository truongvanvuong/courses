package com.example.service;

import java.util.Set;

import com.example.model.Coursea;
import com.example.model.Lessons;

public interface LessnosService {
	public Lessons addLessons(Lessons lessons);
	
	public Lessons updateLessons(Lessons lessons);
	
	public Set<Lessons> getLessonss();
	
	public Lessons getLessons(Long lessonsId);
	
	public Set<Lessons> getLessonsOfCoursea(Coursea coursea);
	
	public void deleteLessons(Long lessonsId);
}
