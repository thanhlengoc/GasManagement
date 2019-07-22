package com.vn.gasmanagement;

import org.springframework.context.ApplicationContext;;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@PropertySource(value = {"dev.config.properties", "dev.dbs.properties"})
public class Main {

	private static ApplicationContext ctx;

	public static void main(String[] args) { ctx = SpringApplication.run(Main.class, args); }

	public static ApplicationContext getCtx() {
		return ctx;
	}
}
