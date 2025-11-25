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
        const priceText = med.price ? `<strong>£${med.price}</strong>` : '<strong style="color: red;">Price not provided</strong>';
        listItem.innerHTML = `${validName}: ${priceText}`;

        list.appendChild(listItem);
    });
  } catch (error) {
    console.error(error.message);
  }
}

getMedicines();

const addMedForm = document.getElementById('add-medicine-form');

addMedForm.addEventListener('submit', async function(event) {

    event.preventDefault();

    const formData = new FormData(addMedForm);

    try {
        const response = await fetch('http://localhost:8000/create', {
            method: 'POST',
            body: formData 
        });

        if (response.ok) {
            console.log("Medicine added!");

            addMedForm.reset();

            document.getElementById('medicine-list').innerHTML = '';
            document.getElementById('conf').innerHTML = '<strong style="color: red;">Medicine added successfully!</strong>';
            getMedicines(); 
        } else {
            console.error("Failed to add medicine");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});