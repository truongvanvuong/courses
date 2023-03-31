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
@Table(name = "users")

public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;
	private String userName;
	private String avatar;
	private String coverimage;
	private String email;
	private String phone;
	private String password;
	private boolean enabled = true;

	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<SubCourse> subCourse = new LinkedHashSet<>();

	public User() {

	}
	

	public User(Long id, String name, String userName, String avatar, String coverimage, String email, String phone,
			String password, boolean enabled, Set<SubCourse> subCourse) {
		super();
		this.id = id;
		this.name = name;
		this.userName = userName;
		this.avatar = avatar;
		this.coverimage = coverimage;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.enabled = enabled;
		this.subCourse = subCourse;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getCoverimage() {
		return coverimage;
	}


	public void setCoverimage(String coverimage) {
		this.coverimage = coverimage;
	}


	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public Set<SubCourse> getSubCourse() {
		return subCourse;
	}

	public void setSubCourse(Set<SubCourse> subCourse) {
		this.subCourse = subCourse;
	}

}
