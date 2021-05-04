package com.productionagribusiness.agribusiness;

import com.productionagribusiness.agribusiness.config.CorsConfig;
import com.productionagribusiness.agribusiness.jwt.JWTWebSecurityConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@Import({
		CorsConfig.class,
		JWTWebSecurityConfig.class
})
public class AgribusinessApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgribusinessApplication.class, args);
	}

	@PostConstruct
	public void init(){
		// Setting Spring Boot SetTimeZone
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

}
