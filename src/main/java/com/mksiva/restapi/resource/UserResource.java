package com.mksiva.restapi.resource;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import org.springframework.hateoas.ResourceSupport;

import com.mksiva.domain.User;
import com.mksiva.restapi.controller.UserRestController;

/**
 * Created by Siva on 21.08.17
 */
public class UserResource extends ResourceSupport {

    private String fullName;

    private String userName;
    
    private String email;    
    
    private String phone;
    
    private String addressLine1;
    
    private String addressLine2;
    
    private String state;
    
    private String country;
    
    private String zip;
    
    private boolean active;
    
    private String roles[];

    public UserResource(User user) {

        this.fullName = user.getFullName();

        this.userName = user.getUserName();

        this.roles = user.getRoles();

        this.email = user.getEmail();
        
        this.phone = user.getPhone();
        
        this.addressLine1 = user.getAddressLine1();
        
        this.addressLine2 = user.getAddressLine2();
        
        this.state = user.getState();
        
        this.country = user.getCountry();
        
        this.zip = user.getZip();
        
        this.active = user.isActive();
        
        this.add(linkTo(methodOn(
                UserRestController.class
                ).getUser(user.getUserName())
        ).withSelfRel());

/*        this.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(
                TimeEntryRestController.class, user.getUserName()
        ).getTimeEntries(user.getUserName(), null, null)
        ).withRel("timeEntries"));

        this.add(ControllerLinkBuilder.linkTo(ControllerLinkBuilder.methodOn(
                ReportWeekRestController.class, user.getUserName()
                ).getWeeklyReport(user.getUserName())
        ).withRel("reportWeeks"));
*/    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
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

	public String getAddressLine1() {
		return addressLine1;
	}

	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	public String getAddressLine2() {
		return addressLine2;
	}

	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
    
    
}
