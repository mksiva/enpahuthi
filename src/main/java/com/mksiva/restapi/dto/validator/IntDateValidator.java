package com.mksiva.restapi.dto.validator;

import com.mksiva.common.DateUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.DateTimeException;

/**
 * Created by Siva on 21.08.17
 */
public class IntDateValidator implements ConstraintValidator<IntDateValidate, Integer> {

    private IntDateValidate intDateValidate;

    @Override
    public void initialize(IntDateValidate intDateValidate) {
        this.intDateValidate = intDateValidate;
    }

    @Override
    public boolean isValid(Integer intDate, ConstraintValidatorContext constraintValidatorContext) {
        if (intDate == null) {
            return true;
        }
        try {
            DateUtils.localDate(intDate);
        } catch (DateTimeException ex) {
            return false;
        }

        return true;
    }

}
