package com.example.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Coursea;
import com.example.model.Lessons;
import com.example.service.LessnosService;

@RestController
@CrossOrigin("*")
@RequestMapping("/lessons")
public class LessonsController {

	@Autowired
	private LessnosService lessnosService;


	// add lessons
	@PostMapping("/")
	public ResponseEntity<Lessons> add(@RequestBody Lessons lessons) {
		return ResponseEntity.ok(this.lessnosService.addLessons(lessons));
	}

	// update quiz
	@PutMapping("/")
	public ResponseEntity<Lessons> update(@RequestBody Lessons lessons) {
		return ResponseEntity.ok(this.lessnosService.updateLessons(lessons));
	}

	// get Lessons

	@GetMapping("/")
	public ResponseEntity<?> lessonss() {
		return ResponseEntity.ok(this.lessnosService.getLessonss());
	}

	// get single lessons
	@GetMapping("/{lessonsId}")
	public Lessons lessons(@PathVariable("lessonsId") Long lessonsId) {
		return this.lessnosService.getLessons(lessonsId);
	}

	// delete Lessons
	@DeleteMapping("/{lessonsId}")
	public void delete(@PathVariable("lessonsId") Long lessonsId) {
		this.lessnosService.deleteLessons(lessonsId);
	}

	// get all Lessons
	@GetMapping("/coursea/{courseaId}")
	public ResponseEntity<?> LessonsOfCourse(@PathVariable("courseaId") Long courseaId) {

		Coursea coursea = new Coursea();
		coursea.setId(courseaId);
		Set<Lessons> lessonsOfCoursea = this.lessnosService.getLessonsOfCoursea(coursea);
		return ResponseEntity.ok(lessonsOfCoursea);

	}

}
