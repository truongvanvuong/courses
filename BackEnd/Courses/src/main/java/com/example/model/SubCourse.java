package com.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity

public class SubCourse {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private boolean iscoursea = true;
	@ManyToOne(fetch = FetchType.EAGER)
	private Coursea coursea;
	@ManyToOne(fetch = FetchType.EAGER)
	private User user;
	
	public SubCourse() {

	}
	public SubCourse(Long id, Coursea coursea, User user, boolean iscoursea) {
		super();
		this.id = id;
		this.coursea = coursea;
		this.user = user;
		this.iscoursea = iscoursea;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Coursea getCoursea() {
		return coursea;
	}

	public void setCoursea(Coursea coursea) {
		this.coursea = coursea;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public boolean isIscoursea() {
		return iscoursea;
	}

	public void setIscoursea(boolean iscoursea) {
		this.iscoursea = iscoursea;
	}

}
