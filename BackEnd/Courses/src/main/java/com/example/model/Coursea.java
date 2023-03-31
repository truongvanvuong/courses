package com.example.model;


import java.util.LinkedHashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "coursea")
public class Coursea {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String title;
	private String img;
	private String description;
	private String createdat;
	private String updatedat;

	@OneToMany(mappedBy = "coursea", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Lessons> lessons = new LinkedHashSet<>();

	@OneToMany(mappedBy = "coursea", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<SubCourse> subCourse = new LinkedHashSet<>();

	public Coursea() {

	}
	
	

	public Coursea(Long id, String title, String img, String description, String createdat, String updatedat,
			Set<Lessons> lessons, Set<SubCourse> subCourse) {
		super();
		this.id = id;
		this.title = title;
		this.img = img;
		this.description = description;
		this.createdat = createdat;
		this.updatedat = updatedat;
		this.lessons = lessons;
		this.subCourse = subCourse;
	}



	

	public String getCreatedat() {
		return createdat;
	}



	public void setCreatedat(String createdat) {
		this.createdat = createdat;
	}



	public String getUpdatedat() {
		return updatedat;
	}



	public void setUpdatedat(String updatedat) {
		this.updatedat = updatedat;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<Lessons> getLessons() {
		return lessons;
	}

	public void setLessons(Set<Lessons> lessons) {
		this.lessons = lessons;
	}
	public Set<SubCourse> getSubCourse() {
		return subCourse;
	}
	public void setSubCourse(Set<SubCourse> subCourse) {
		this.subCourse = subCourse;
	}
}
