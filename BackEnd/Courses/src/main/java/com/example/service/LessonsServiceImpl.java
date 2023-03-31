package com.example.service;

import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Repostiory.LessonsRepostiory;
import com.example.model.Coursea;
import com.example.model.Lessons;

@Service
public class LessonsServiceImpl implements LessnosService {

	@Autowired
	private LessonsRepostiory lessonsRepostiory;

	@Override
	public Lessons addLessons(Lessons lessons) {

		return this.lessonsRepostiory.save(lessons);
	}

	@Override
	public Lessons updateLessons(Lessons lessons) {

		return this.lessonsRepostiory.save(lessons);
	}

	@Override
	public Set<Lessons> getLessonss() {

		return new HashSet<>(this.lessonsRepostiory.findAll());
	}

	@Override
	public Lessons getLessons(Long lessonsId) {

		return this.lessonsRepostiory.findById(lessonsId).get();
	}

	@Override
	public void deleteLessons(Long lessonsId) {
		Lessons lessons = new Lessons();
		lessons.setId(lessonsId);
		this.lessonsRepostiory.delete(lessons);
	}

	@Override
	public Set<Lessons> getLessonsOfCoursea(Coursea coursea) {
		
		return this.lessonsRepostiory.findByCoursea(coursea);
	}

}
