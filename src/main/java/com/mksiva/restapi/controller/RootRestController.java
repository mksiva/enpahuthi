package com.mksiva.restapi.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.mksiva.restapi.resource.RootResource;

/**
 * Created by Siva on 21.08.17
 */
@RestController
@RequestMapping("/api")
public class RootRestController {

    @RequestMapping(method = RequestMethod.GET)
    public RootResource getRoot() {
        return new RootResource();
    }

}
