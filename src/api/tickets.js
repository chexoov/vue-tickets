export default (http) => ({
    getTickets: (pageNumber = 1, pageSize = 10) => http.get(`/appeals/v1.0/appeals?page_size=${pageSize}&page=${pageNumber}`),
    searchTicket: (searchInput = "") => http.get(`/appeals/v1.0/appeals?search=${searchInput}}`),
    getPremise: () => http.get("/geo/v2.0/user-premises/?search="),
    updateTicket: (id, payLoad) => http.patch(`/appeals/v1.0/appeals/${id}`, payLoad),
    getApartments: (premise) => http.get(`/geo/v1.0/apartments/?premise_id=${premise}&search=`),
    createTicket: (payLoad) => http.post("/appeals/v1.0/appeals/", payLoad),
});