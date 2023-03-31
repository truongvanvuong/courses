package com.example.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.SubCourse;
import com.example.service.SubCourseService;

@RestController
@CrossOrigin("*")
@RequestMapping("/subcourse")
public class SubCourseController {

	@Autowired
	private SubCourseService subCourseService;

	@GetMapping("/")
	public ResponseEntity<?> getSubCourses() {
		return ResponseEntity.ok(this.subCourseService.getSubCourses());
	}
	// add Subcoursea
	@PostMapping("/")
	public ResponseEntity<?> addSubCourses(@RequestBody SubCourse subCoursea) {
		SubCourse subCoursea1 = this.subCourseService.addSubCourse(subCoursea);
		return ResponseEntity.ok(subCoursea1);
	}
	// checkSubscribed
	@GetMapping("/{courseId}/{userId}")
	public ResponseEntity<?> checkSubCourse(@PathVariable Long courseId, @PathVariable Long userId) {
		boolean isSubscribed = this.subCourseService.checkSubscribed(courseId, userId);
		return ResponseEntity.ok(isSubscribed);
	}
	@GetMapping("/{userId}")
	public ResponseEntity<?> getSubscribedCourses(@PathVariable Long userId) {
	    return ResponseEntity.ok(this.subCourseService.getSubscribedCourses(userId));
	}
	@GetMapping("/courseitem/{courseId}")
	public ResponseEntity<?> getSubscribedCoursesItem(@PathVariable Long courseId) {
	    return ResponseEntity.ok(this.subCourseService.getSubscribedCoursesItem(courseId));
	}
}
