async function getMedicines() {
    const list = document.getElementById('medicationList');
  const url = "http://localhost:8000/medicines";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    result.medicines.forEach(med => {
        const listItem = document.createElement('div');
        listItem.classList.add('medicationItem')

        const validName = med.name ? med.name : '<strong style="color: red;">Name not provided</strong>';
        const priceText = med.price ? `<strong>£${med.price}</strong>` : '<strong style="color: red;">Price not provided</strong>';

        const medHeader = document.createElement('p');
        medHeader.innerHTML = `${validName}: ${priceText}`;
        listItem.appendChild(medHeader)
        if (med.name) {
          const deleteForm = document.createElement('form');
          deleteForm.setAttribute('method', 'DELETE');
          deleteForm.setAttribute('action', 'http://localhost:8000/delete');

          const deleteName = document.createElement('input');
          deleteName.type = 'hidden';
          deleteName.name = 'name';
          deleteName.value = med.name;
          deleteForm.appendChild(deleteName);

          const deleteButton = document.createElement('button');
          deleteButton.innerText = 'Remove';
          deleteButton.type = 'submit';
          deleteForm.appendChild(deleteButton);

          deleteForm.addEventListener('submit', async function(e) {
            e.preventDefault(); 

            const id = deleteName.value;
            
            console.log(`Submitting form for Item ID: ${id}`);
            
            try {
              const encodedName = encodeURIComponent(id);

              const response = await fetch(`http://localhost:8000/delete?name=${encodedName}`, {
                  method: 'DELETE',
              });

              if (response.ok) {
                  console.log("Medicine deleted!");

                  document.getElementById('medicine-list').innerHTML = ''; 
                  getMedicines(); 
              } else {
                  console.error("Failed to delete medicine");
              }
            } catch (error) {
                console.error("Error:", error);
            }
          });

          listItem.appendChild(deleteForm);
        }

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