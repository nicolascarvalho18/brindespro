package br.com.brindespro.admin;import jakarta.persistence.*;
@Entity @Table(name="app_settings") public class AppSetting {@Id @Column(name="key") public String key;@Column(nullable=false,length=2000) public String value;protected AppSetting(){} public AppSetting(String key,String value){this.key=key;this.value=value;}}
