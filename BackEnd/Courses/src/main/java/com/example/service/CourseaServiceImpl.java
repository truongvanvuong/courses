package com.example.service;

import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Repostiory.CourseaRepostiory;
import com.example.model.Coursea;

@Service
public class CourseaServiceImpl implements CourseaService {

	@Autowired
	private CourseaRepostiory courseaRepostiory;

	@Override
	public Coursea addCourses(Coursea courses) {

		return this.courseaRepostiory.save(courses);
	}

	@Override
	public Coursea updateCoursea(Coursea coursea) {

		return this.courseaRepostiory.save(coursea);
	}

	@Override
	public Set<Coursea> getCourseas() {
		return new LinkedHashSet<>(this.courseaRepostiory.findAll());
	}

	@Override
	public Coursea getCoursea(Long courseaId) {
		return this.courseaRepostiory.findById(courseaId).get();
	}

	@Override
	public void deleteCoursea(Long courseaId) {

		this.courseaRepostiory.deleteById(courseaId);

	}

	@Override
	public Set<Coursea> searchCourses(String keyword) {
		Set<Coursea> allCourses = getCourseas();
		Set<Coursea> result = allCourses.stream()
				.filter(course -> course.getTitle().toLowerCase().contains(keyword.toLowerCase()))
				.collect(Collectors.toSet());
		return result;
	}

}
