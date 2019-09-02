const apiKey = 'F5g-YKtptzK3fNUhS_DbGIoV8N-rFimeCyDhDuo4QGzelmG_Mzz_5RzmuuSrr65yuf_NUHHd8lAtwkHtBGeuxauhHOodqTyu5GglbHj2ea90takMheRoLRajxm5sXXYx';

/* Yelp.js */

// This object will store the functionality needed
// to interact with the Yelp API
const Yelp = {
    // This method will retrieve search results from the Yelp API
    /*
        Your fetch() will currently not function correctly due to CORS restrictions.

        We can bypass this restriction with an API called CORS Anywhere. CORS Anywhere will take requests sent to its API endpoint, make them for the requesting app with the proper CORS permissions, and then return the response back to the requesting app.

        Prepend the URL path you passed to the first argument in fetch() with the following:
    */
   /*
   When we make requests to the Yelp API, we have to present a form of identification for the browser. This is because the Yelp API wants to know that we are authorized to access the API.

    This identification is presented using our API key as a browser header.

    Pass in a second argument to the fetch() call. It should be an object with a key of headers.

    The value of headers should be another object.

    This object should have Authorization as a key. The value of this key should be:

    `Bearer ${apiKey}`
    */
    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
           headers: {Authorization : `Bearer ${apiKey}`}
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.display_address,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }
                });
            }
        });
    } 
};

export default Yelp;