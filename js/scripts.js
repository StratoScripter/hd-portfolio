// Use AWS SDK to fetch API token from Secrets Manager
async function fetchAPIToken() {
    const secretName = "hd-portfolio"; // Replace with your secret name
    const client = new AWS.SecretsManager({ region: "ap-southeast-1" }); // Replace with your region
    let response;

    try {
        response = await client.getSecretValue({ SecretId: secretName });
    } catch (error) {
        console.error("Error fetching API token:", error);
        return null;
    }

    return response.SecretString;
}

// When the DOM is loaded, fetch API token and update the form
document.addEventListener("DOMContentLoaded", async () => {
    const apiToken = await fetchAPIToken();
    if (apiToken) {
        document.getElementById("accessKeyInput").value = apiToken; // Update access_key input field with API token
    }
});

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
