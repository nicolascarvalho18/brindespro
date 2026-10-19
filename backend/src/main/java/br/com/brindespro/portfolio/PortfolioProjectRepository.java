package br.com.brindespro.portfolio;
import org.springframework.data.jpa.repository.JpaRepository;import java.util.*;
public interface PortfolioProjectRepository extends JpaRepository<PortfolioProject,Long>{List<PortfolioProject> findByActiveTrueOrderByFeaturedDescCreatedAtDesc();List<PortfolioProject> findByActiveTrueAndSegmentIgnoreCaseOrderByFeaturedDescCreatedAtDesc(String segment);List<PortfolioProject> findByActiveTrueAndFeaturedTrueOrderByCreatedAtDesc();}
