<<<<<<< Updated upstream
package com.cg.service;public interface IGeneralService {
=======
package com.cg.service;

import java.util.List;
import java.util.Optional;

public interface IGeneralService <E, T>{
    List<E> findAll();

    Optional<E> findById(T id);

    void save(E e);

    void update(E e);

    void deleteById(T id);
>>>>>>> Stashed changes
}
