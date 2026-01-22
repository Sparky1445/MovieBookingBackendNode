export const queryResolver = (query) => {
    let Query = {};

    if (query?.city) {
        Query.city = query.city;
    }

    if (query?.pincode) {
        Query.pincode = query.pincode;
    }

    if (query?.name) {
        Query.name = query.name;
    }

    query?.page ? Query.page = query.page : Query.page = 1;
    query?.limit ? Query.limit = query.limit : Query.limit = 5;





    return Query;
}