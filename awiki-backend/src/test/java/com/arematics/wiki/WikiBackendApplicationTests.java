package com.arematics.wiki;

import com.arematics.wiki.model.MenuGroup;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

@SpringBootTest
class WikiBackendApplicationTests extends Assertions {

    private final String redirectUrl = "http://localhost:8080/";
    private final String authorizeUrlPattern = "http://localhost:8085/auth/realms/arematics/protocol/openid-connect/auth?response_type=code&client_id=webpanel&scope=openid&roles&redirect_uri=" + redirectUrl;
    private final String tokenUrl = "http://localhost:8085/auth/realms/arematics/protocol/openid-connect/token";

    @Test
    void contextLoads() {
    }

    @Test
    public void givenUserWithWriteScope_whenPostNewBarResource_thenCreated() {
        String accessToken = obtainAccessToken("read write");
        MenuGroup newGroup = new MenuGroup(null, "A", 0);

        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .body(newGroup)
                .log()
                .all()
                .post("http://localhost:8080/api/v1/group");
        assertEquals(response.getStatusCode(), HttpStatus.CREATED.value());
    }

    private String obtainAccessToken(String scopes) {
        System.out.println(String.format(authorizeUrlPattern, scopes));
        // obtain authentication url with custom codes
        Response response = RestAssured.given()
                .redirects()
                .follow(false)
                .get(String.format(authorizeUrlPattern, scopes));
        String authSessionId = response.getCookie("AUTH_SESSION_ID");
        String kcPostAuthenticationUrl = response.asString()
                .split("action=\"")[1].split("\"")[0].replace("&amp;", "&");

        // obtain authentication code and state
        response = RestAssured.given()
                .redirects()
                .follow(false)
                .cookie("AUTH_SESSION_ID", authSessionId)
                .formParams("username", "klysma", "password", "#jU='@&\\^ob\"=CwSus3t", "credentialId", "")
                .post(kcPostAuthenticationUrl);
        assertEquals(HttpStatus.FOUND.value(), response.getStatusCode());

        // extract authorization code
        String location = response.getHeader(HttpHeaders.LOCATION);
        System.out.println(location);
        String code = location.split("code=")[1].split("&")[0];

        // get access token
        Map<String, String> params = new HashMap<>();
        params.put("grant_type", "authorization_code");
        params.put("code", code);
        params.put("client_id", "webpanel");
        params.put("redirect_uri", redirectUrl);
        params.put("client_secret", "638d0a30-a139-441c-b0bf-9d719e711e9c");
        response = RestAssured.given()
                .formParams(params)
                .post(tokenUrl);
        return response.jsonPath()
                .getString("access_token");
    }

}
