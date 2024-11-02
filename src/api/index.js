import http from "./http-client";
import tickets from "./tickets";

export default {
    tickets: tickets(http),
}