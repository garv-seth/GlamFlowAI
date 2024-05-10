document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(event.target);
  const searchParams = new URLSearchParams(formData).toString();

  fetch(`/search?${searchParams}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(response => response.json())
    .then(results => {
      const searchResultsContainer = document.getElementById('search-results');
      searchResultsContainer.innerHTML = ''; // Clear previous results

      results.forEach(result => {
        const salonResult = document.createElement('div');
        salonResult.classList.add('salon-result');

        const salonName = document.createElement('h2');
        salonName.textContent = result.salon_name;

        const salonAddress = document.createElement('p');
        salonAddress.textContent = `Address: ${result.salon_address}`;

        const salonPhone = document.createElement('p');
        salonPhone.textContent = `Phone: ${result.salon_phone}`;

        const salonRating = document.createElement('p');
        salonRating.textContent = `Rating: ${result.salon_rating}`;

        const viewDetailsLink = document.createElement('a');
        viewDetailsLink.href = `/salon/${result.salon_id}`;
        viewDetailsLink.textContent = 'View Details';

        salonResult.appendChild(salonName);
        salonResult.appendChild(salonAddress);
        salonResult.appendChild(salonPhone);
        salonResult.appendChild(salonRating);
        salonResult.appendChild(viewDetailsLink);

        searchResultsContainer.appendChild(salonResult);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});