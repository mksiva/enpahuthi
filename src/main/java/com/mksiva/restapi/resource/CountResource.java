package com.mksiva.restapi.resource;

import org.springframework.hateoas.ResourceSupport;

/**
 * Created by siva on 21.8.17.
 */
public class CountResource extends ResourceSupport {

    private Long count;

    public CountResource(Long count) {
    	this.count = count;
    }
    
    public Long getCount() {
		return count;
	}
    public void setCount(Long count) {
		this.count = count;
	}
}
