package com.mksiva.restapi.resource;

import org.springframework.hateoas.ResourceSupport;
import com.mksiva.restapi.controller.UserRestController;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;

/**
 * Created by Siva on 21.08.17
 */
public class RootResource extends ResourceSupport {

    public RootResource() {

        add(
                linkTo(UserRestController.class).withRel("users")
        );

    }
}
