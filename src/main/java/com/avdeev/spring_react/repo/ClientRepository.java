package com.avdeev.spring_react.repo;

import com.avdeev.spring_react.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
