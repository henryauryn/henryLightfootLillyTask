async function getMedicines() {
    const list = document.getElementById('medicine-list');
  const url = "http://localhost:8000/medicines";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    result.medicines.forEach(med => {
        console.log(med);

        const listItem = document.createElement('li');

        const validName = med.name ? med.name : '<strong style="color: red;">Name not provided</strong>';
        const priceText = med.price ? `£${med.price}` : '<strong style="color: red;">Price not provided</strong>';
        listItem.innerHTML = `${validName}: ${priceText}`;

        list.appendChild(listItem);
    });
  } catch (error) {
    console.error(error.message);
  }
}

getMedicines();