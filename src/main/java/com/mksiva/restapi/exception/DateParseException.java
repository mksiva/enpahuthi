package com.mksiva.restapi.exception;

/**
 * Created by Siva on 21.08.17
 */
public class DateParseException extends RuntimeException {

    private String field;
    private String value;

    public DateParseException(String field, String value) {
        this.field = field;
        this.value = value;
    }

    public String getField() {
        return field;
    }

    public String getValue() {
        return value;
    }

}
