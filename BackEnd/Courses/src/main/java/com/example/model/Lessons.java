package com.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Lessons {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String nameLessons;
	private String img;
	private String url;
	private String description;
	private boolean active = false;

	@ManyToOne(fetch = FetchType.EAGER)
	private Coursea coursea;

	public Lessons() {

	}
	public Lessons(Long id, String nameLessons, String img, String url, String description, boolean active,
			Coursea coursea) {
		this.id = id;
		this.nameLessons = nameLessons;
		this.img = img;
		this.url = url;
		this.description = description;
		this.active = active;
		this.coursea = coursea;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNameLessons() {
		return nameLessons;
	}

	public void setNameLessons(String nameLessons) {
		this.nameLessons = nameLessons;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Coursea getCoursea() {
		return coursea;
	}

	public void setCoursea(Coursea coursea) {
		this.coursea = coursea;
	}
	
}
