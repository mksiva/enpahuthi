package com.mksiva.service.exception;

/**
 * Created by Siva on 21.08.17
 */
public class UpdatedUserNotFoundException extends Exception {

    String userName;

    public UpdatedUserNotFoundException(String userName) {
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

}
