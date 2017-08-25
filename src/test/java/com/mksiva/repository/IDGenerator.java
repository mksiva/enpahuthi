package com.mksiva.repository;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by Siva on 21.08.17
 */
public class IDGenerator {

    private static AtomicInteger atomicInteger = new AtomicInteger(0);

    public static String getNextId() {
        return String.valueOf(atomicInteger.incrementAndGet());
    }

}
