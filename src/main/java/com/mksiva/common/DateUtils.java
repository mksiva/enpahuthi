package com.mksiva.common;


import java.time.LocalDate;

/**
 * Created by Siva on 21.08.17
 */

public class DateUtils {

    public static LocalDate localDate(int date) {
        return LocalDate.of(getYear(date),getMonth(date), getDay(date));
    }

    public static int getYear(int date) {
        return date / 100_00;
    }

    public static int getMonth(int date) {
        return (date % 100_00) / 100;
    }

    public static int getDay(int date) {
        return date % 100;
    }

    public static int intDate(LocalDate localDate) {
        return localDate.getYear() * 100_00
                + localDate.getMonthValue() * 100
                + localDate.getDayOfMonth();
    }

}
