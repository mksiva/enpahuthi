package com.mksiva.repository;

import com.mksiva.domain.User;

import java.util.*;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

/**
 * Created by Siva on 21.08.17
 */
public class TestUserRepository extends DummyAbstractRepository<User, String> implements UserRepository {

    Collection<User> userCollection = new ArrayList<>();
 
    @Override
    public Optional<User> findByUserName(String userName) {
        Objects.requireNonNull(userName);

        return new ArrayList<>(userCollection).stream().filter(user -> userName.equals(user.getUserName())).findAny();
    }

    @Override
    public User save(User entity) {
        if (entity.getId() == null) {
            entity.setId(IDGenerator.getNextId());
        }

        Optional<User> userOptional = userCollection.stream().filter(user -> entity.getUserName().equals(user.getUserName()))
                .findAny();

        if (userOptional.isPresent()) {
            userCollection.remove(userOptional.get());
        }

        userCollection.add(entity);

        return entity;
    }

    @Override
    public void delete(String id) {
        Objects.requireNonNull(id);

        userCollection.removeIf(user -> id.equals(user.getId()));
    }

    @Override
    public void delete(User entity) {
        Objects.requireNonNull(entity);

        delete(entity.getId());
    }

    @Override
    public List<User> findAll() {
        return new ArrayList<>(userCollection);
    }

	@Override
	public <S extends User> List<S> findAll(Example<S> example) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends User> List<S> findAll(Example<S> example, Sort sort) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends User> S findOne(Example<S> example) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends User> Page<S> findAll(Example<S> example, Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <S extends User> long count(Example<S> example) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public <S extends User> boolean exists(Example<S> example) {
		// TODO Auto-generated method stub
		return false;
	}
}
