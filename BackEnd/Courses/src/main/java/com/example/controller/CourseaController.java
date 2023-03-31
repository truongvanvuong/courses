package com.example.controller;

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
import com.example.service.CourseaService;

@RestController
@RequestMapping("/coursea")
@CrossOrigin("*")
public class CourseaController {

	@Autowired
	private CourseaService courseaService;

	// add Courses
	@PostMapping("/")
	public ResponseEntity<?> addCourses(@RequestBody Coursea coursea) {
		Coursea coursea1 = this.courseaService.addCourses(coursea);
		return ResponseEntity.ok(coursea1);
	}

	// get courses
	@GetMapping("/{courseaId}")
	public Coursea getCoursea(@PathVariable("courseaId") Long courseaId) {
		return this.courseaService.getCoursea(courseaId);
	}

	// get all courses
	@GetMapping("/")
	public ResponseEntity<?> getCourseas() {
		return ResponseEntity.ok(this.courseaService.getCourseas());
	}
	//update coursea
	@PutMapping("/")
	public Coursea updatessCoursea(@RequestBody Coursea coursea) {
		return this.courseaService.updateCoursea(coursea);
	}
	
	@DeleteMapping("/{courseaId}")
	public void deleteCoursea(@PathVariable("courseaId") Long courseaId) {
		 this.courseaService.deleteCoursea(courseaId);
	}
	@GetMapping("/search/{keyvalue}")
	public ResponseEntity<?> searchCourses(@PathVariable("keyvalue") String keyvalue) {
	    return ResponseEntity.ok(this.courseaService.searchCourses(keyvalue));
	}
}
