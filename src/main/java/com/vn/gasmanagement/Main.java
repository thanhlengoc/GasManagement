package com.vn.gasmanagement;

import java.util.concurrent.Executor;
import org.springframework.context.ApplicationContext;;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@SpringBootApplication
@EnableAsync
//@PropertySource(value = {"classpath:${appenv}.config.properties",
//		"classpath:${appenv}.dbs.properties"})
public class Main {

//	public static final String APP_ENV = System.getProperty("appenv", "dev");
//	public static boolean IS_DEV_ENV = (APP_ENV.equals("dev")) ? true : false;

	private static ApplicationContext ctx;

	public static void main(String[] args) { ctx = SpringApplication.run(Main.class, args); }

	@Bean
	public Executor asyncExecutor() {
		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setCorePoolSize(2);
		executor.setMaxPoolSize(2);
		executor.setQueueCapacity(500);
		executor.setThreadNamePrefix("send-mail-");
		executor.initialize();
		return executor;
	}

	public static ApplicationContext getCtx() {
		return ctx;
	}
}
